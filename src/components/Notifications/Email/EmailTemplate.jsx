import React from 'react';
import { Button } from '@exp-textura/react';
import { NintexLogo } from '@exp-textura/icons/brand';
import '../../../styles/EmailTemplate.css';

export function EmailTemplate({ content }) {
  if (!content) return null;

  const renderFormattedText = (text) => {
    return text.split('\n').map((line, i) => (
      <React.Fragment key={i}>
        {line}
        {i < text.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <div className="email-template">
      <table className="email-wrapper" width="100%" cellPadding="0" cellSpacing="0" border="0">
        <tbody>
          <tr>
            <td className="email-container">
              {/* Header */}
              <div className="email-header">
                <div className="header-logo">
                  <NintexLogo />
                </div>
              </div>

              {/* Main Content */}
              <div className="email-body">
                <div className="email-section">
                  <p className="email-label">Customer Usage Alert:</p>
                  <h1 className="email-title">{content.title}</h1>
                </div>

                <div className="email-content">
                  <p className="email-greeting">{content.greeting}</p>

                  <p className="email-body-text">{renderFormattedText(content.body)}</p>

                  <div className="email-ctas">
                    <Button buttonType="primary" size="md" onClick={(e) => e.preventDefault()}>
                      {content.cta1}
                    </Button>
                    <Button buttonType="secondary" size="md" onClick={(e) => e.preventDefault()}>
                      {content.cta2}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="email-footer">
                <p className="footer-text">© 2026 Nintex. All rights reserved.</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
