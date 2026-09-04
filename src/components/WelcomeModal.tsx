import { motion } from 'framer-motion';
import { Sparkles, GitBranch, Database, MessageSquare } from 'lucide-react';

interface WelcomeModalProps {
  onClose: () => void;
}

export function WelcomeModal({ onClose }: WelcomeModalProps) {
  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="modal-content"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 20 }}
      >
        <div className="modal-header">
          <div className="modal-logo">☕</div>
          <h1 className="modal-title">欢迎使用本体探索平台（预览版）</h1>
          <p className="modal-subtitle">
            通过 Fourth Coffee 示例探索 Microsoft Fabric IQ 本体
          </p>
        </div>

        <div className="modal-features">
          <div className="feature-card">
            <div className="feature-icon">
              <Sparkles size={24} color="#0078D4" />
            </div>
            <div className="feature-title">实体类型</div>
            <div className="feature-text">
              了解 Customer、Product、Order 等可复用的逻辑模型
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <GitBranch size={24} color="#5C2D91" />
            </div>
            <div className="feature-title">关系</div>
            <div className="feature-text">
              通过有类型、有方向的关系，了解实体之间的连接
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Database size={24} color="#107C10" />
            </div>
            <div className="feature-title">数据绑定</div>
            <div className="feature-text">
              将本体概念连接到实际数据平台的数据源
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <MessageSquare size={24} color="#FFB900" />
            </div>
            <div className="feature-title">自然语言查询</div>
            <div className="feature-text">
              使用自然语言提问并遍历图谱
            </div>
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn btn-primary" onClick={onClose}>
            <Sparkles size={18} />
            开始探索
          </button>
        </div>

        <div style={{ 
          textAlign: 'center', 
          marginTop: 24, 
          fontSize: 12, 
          color: 'var(--text-tertiary)' 
        }}>
          完成任务，获取徽章，学习 Microsoft Fabric IQ 本体
        </div>
      </motion.div>
    </motion.div>
  );
}
