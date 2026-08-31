import React from 'react';
import '../../../styles/SlackTemplate.css';

export function SlackTemplate({ content, disableHighlight = false }) {
  if (!content) return null;

  // Highlight specific words in the title and body
  function renderHighlightedTitle(title) {
    if (disableHighlight) return title;
    const keywords = ['ACME Corp', 'Approaching', 'Reaching', 'Exceeding', 'URGENT', 'CRITICAL', 'nc_workflow_instances'];
    const parts = title.split(new RegExp(`(${keywords.join('|')})`, 'g'));
    return parts.map((part, i) =>
      keywords.includes(part)
        ? <span key={i} className="slack-highlight">{part}</span>
        : part
    );
  }

  function renderFormattedBody(body) {
    // First split by newlines and add br tags
    const lines = body.split('\n').map((line, i) => (
      <React.Fragment key={i}>
        {disableHighlight ? line : highlightDynamicValues(line)}
        {i < body.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
    return lines;
  }

  function highlightDynamicValues(text) {
    const patterns = [
      { regex: /Acme Corp/g },
      { regex: /nc_workflow_instances/g },
      { regex: /Workflow Instances/g },
      { regex: /APPROACHING|REACHING|EXCEEDING/g },
      { regex: /\d+%/g },
      { regex: /\d+ \/ \d+/g },
      { regex: /December \d+, \d+/g },
      { regex: /of limit/g },
      { regex: /hit the limit in ~\d+ days?/g },
      { regex: /~\d+ days?/g },
    ];

    let result = [text];

    patterns.forEach(({ regex }) => {
      result = result.flatMap(part => {
        if (typeof part !== 'string') return [part];
        const segments = [];
        let lastIndex = 0;
        let match;
        regex.lastIndex = 0;
        while ((match = regex.exec(part)) !== null) {
          if (match.index > lastIndex) {
            segments.push(part.slice(lastIndex, match.index));
          }
          segments.push(<span key={`${match.index}-${match[0]}`} className="slack-highlight">{match[0]}</span>);
          lastIndex = match.index + match[0].length;
        }
        if (lastIndex < part.length) {
          segments.push(part.slice(lastIndex));
        }
        return segments.length > 0 ? segments : [part];
      });
    });

    return result;
  }

  return (
    <div className="slack-template">
      {/* Slack App Header */}
      <div className="slack-ui">
        <div className="slack-sidebar">
          <div className="slack-workspace">
            <span className="workspace-logo">N</span>
            <div>
              <div className="workspace-name">Nintex</div>
            </div>
          </div>
          <div className="slack-channel-label">Channels</div>
          <div className="slack-channel active"># alerts-apac</div>
          <div className="slack-channel"># cs-team</div>
        </div>

        <div className="slack-main">
          <div className="slack-channel-header">
            <span className="channel-header-icon">★</span>
            <span className="channel-header-name">alerts-apac</span>
          </div>

          <div className="slack-messages">
            {/* Bot Message */}
            <div className="slack-message">
              <div className="message-avatar">
                <div className="bot-avatar">N</div>
              </div>
              <div className="message-content">
                <div className="message-meta">
                  <span className="bot-name">Nintex Threshold Notifications</span>
                  <span className="bot-badge">APP</span>
                  <span className="message-time">9:11 AM</span>
                </div>
                <div className="message-body">
                  <p className="slack-message-title">
                    <strong>Customer Usage Alert: </strong>
                    {renderHighlightedTitle(content.title)}
                  </p>

                  <p className="slack-message-greeting">{content.greeting}</p>

                  <p className="slack-message-text">
                    {renderFormattedBody(content.body)}
                  </p>

                  <div className="slack-ctas">
                    <a href="#" className="slack-link">{content.cta1}</a>
                    {content.cta2 && (
                      <>
                        <span className="slack-link-separator"> - </span>
                        <a href="#" className="slack-link">{content.cta2}</a>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reply Box */}
          <div className="slack-reply-box">
            <div className="reply-toolbar">
              <span className="toolbar-btn">B</span>
              <span className="toolbar-btn">I</span>
              <span className="toolbar-btn">U</span>
              <span className="toolbar-btn">S</span>
            </div>
            <div className="reply-input">Jot something down</div>
          </div>
        </div>
      </div>
    </div>
  );
}
