import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { cosmicCoffeeOntology } from './ontology';
import { generateQuerySuggestions, normalizeChineseQuery, processQuery } from './queryEngine';
import { generateQuestsForOntology } from './questGenerator';
import { validateQueryQuestSteps } from './questQueryValidator';
import { parseRDF } from '../lib/rdf/parser';
import { serializeToRDF } from '../lib/rdf/serializer';
import type { Catalogue } from '../types/catalogue';
import type { LearnManifest } from '../types/learn';

describe('Simplified Chinese localization', () => {
  it.each([
    ['什么是客户？', 'what is Customer'],
    [' 显示所有客户。 ', 'show me all Customer'],
    ['列出全部购物车', 'show me all Shopping-Cart'],
    ['Customer 如何连接到 Order？', 'how does Customer connect to Order'],
    ['查看 客户 的 email 属性', 'Customer email'],
    ['订单有多少条？', 'how many Order'],
    ['什么是 __proto__？', 'what is __proto__'],
    ['__proto__', '__proto__'],
    ['constructor', 'constructor'],
  ])('normalizes %s without changing schema identifiers', (input, expected) => {
    expect(normalizeChineseQuery(input)).toBe(expected);
    expect(() => processQuery(input, cosmicCoffeeOntology)).not.toThrow();
  });

  it.each([
    ['显示所有金卡会员', 'show me all gold tier customers'],
    ['西雅图有哪些门店？', 'how many stores are in seattle'],
    ['哪些产品来自埃塞俄比亚？', 'which products come from ethiopia'],
    ['Arif Ramadhan 下了哪些订单？', 'what orders did arif ramadhan place'],
    ['哥伦比亚拿铁的供应链', 'show supply chain for colombian latte'],
    ['显示所有白金会员', 'show me platinum customers'],
    ['显示有机产品', 'list all organic products'],
  ])('keeps demo query %s equivalent to its English form', (chinese, english) => {
    const actual = processQuery(chinese, cosmicCoffeeOntology);
    const expected = processQuery(english, cosmicCoffeeOntology);
    expect(actual.query).toBe(chinese);
    expect(actual.result).toBe(expected.result);
    expect(actual.highlightEntities).toEqual(expected.highlightEntities);
    expect(actual.interpretation).toContain('示例查询');
    expect(actual.result).toMatch(/[\u3400-\u9fff]/);
  });

  it('keeps Chinese generated queries executable for every catalogue ontology', () => {
    const catalogue = JSON.parse(readFileSync(resolve('public/catalogue.json'), 'utf8')) as Catalogue;
    expect(catalogue.entries.length).toBeGreaterThanOrEqual(71);
    for (const entry of catalogue.entries) {
      expect(entry.description, entry.id).toMatch(/[\u3400-\u9fff]/);
      expect(validateQueryQuestSteps(generateQuestsForOntology(entry.ontology), entry.ontology), entry.id).toEqual([]);
      for (const query of generateQuerySuggestions(entry.ontology)) {
        expect(query).toMatch(/[\u3400-\u9fff]/);
        expect(processQuery(query, entry.ontology).interpretation, `${entry.id}: ${query}`).toBeDefined();
      }
    }
  });

  it('preserves Chinese RDF text and canonical entity IDs through round trips', () => {
    const original = {
      ...cosmicCoffeeOntology,
      name: '咖啡供应链',
      description: '中文说明：采购、库存与订单 & 配送',
    };
    const parsed = parseRDF(serializeToRDF(original, [])).ontology;
    expect(parsed).toEqual(original);
  });

  it('ships all Chinese courses, articles and valid quizzes', () => {
    const manifest = JSON.parse(readFileSync(resolve('public/learn.json'), 'utf8')) as LearnManifest;
    expect(manifest.courses.length).toBeGreaterThanOrEqual(13);
    expect(manifest.courses.flatMap(course => course.articles).length).toBeGreaterThanOrEqual(61);
    let quizzes = 0;
    for (const course of manifest.courses) {
      expect(course.title, course.slug).toMatch(/[\u3400-\u9fff]/);
      expect(course.description, course.slug).toMatch(/[\u3400-\u9fff]/);
      for (const article of course.articles) {
        expect(article.title, article.slug).toMatch(/[\u3400-\u9fff]/);
        expect(article.description, article.slug).toMatch(/[\u3400-\u9fff]/);
        const container = document.createElement('div');
        container.innerHTML = article.html;
        for (const block of container.querySelectorAll('[data-quiz]')) {
          const quiz = JSON.parse(block.getAttribute('data-quiz')!) as {
            question: string; options: { text: string; correct: boolean }[];
          };
          expect(quiz.question, article.slug).toMatch(/[\u3400-\u9fff]/);
          expect(quiz.options.filter(option => option.correct), article.slug).toHaveLength(1);
          quizzes++;
        }
      }
    }
    expect(quizzes).toBeGreaterThan(30);
  });
});
