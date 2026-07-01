# URL Mapping for Pointer

> **Note:** Delete this file after setting up Pointer URL mappings.

---

## HUB PAGE

| Description | Local URL | Production URL |
|---|---|---|
| Notification Hub (Home) | `http://localhost:5173/#/hub` | `https://threshold-notifications.netlify.app/#/hub` |

---

## NOTIFICATION PREVIEW PAGES

### Approaching Tier

| User Type | Channel | Local URL | Production URL |
|---|---|---|---|
| Admin | Email | `http://localhost:5173/#/notifications/approaching/admin/email` | `https://threshold-notifications.netlify.app/#/notifications/approaching/admin/email` |
| Account Owner | Email | `http://localhost:5173/#/notifications/approaching/accountOwner/email` | `https://threshold-notifications.netlify.app/#/notifications/approaching/accountOwner/email` |
| Account Owner | Slack | `http://localhost:5173/#/notifications/approaching/accountOwner/slack` | `https://threshold-notifications.netlify.app/#/notifications/approaching/accountOwner/slack` |
| Customer Success | Email | `http://localhost:5173/#/notifications/approaching/customerSuccess/email` | `https://threshold-notifications.netlify.app/#/notifications/approaching/customerSuccess/email` |
| Customer Success | Slack | `http://localhost:5173/#/notifications/approaching/customerSuccess/slack` | `https://threshold-notifications.netlify.app/#/notifications/approaching/customerSuccess/slack` |

### Reaching Tier

| User Type | Channel | Local URL | Production URL |
|---|---|---|---|
| Admin | Email | `http://localhost:5173/#/notifications/reaching/admin/email` | `https://threshold-notifications.netlify.app/#/notifications/reaching/admin/email` |
| Account Owner | Email | `http://localhost:5173/#/notifications/reaching/accountOwner/email` | `https://threshold-notifications.netlify.app/#/notifications/reaching/accountOwner/email` |
| Account Owner | Slack | `http://localhost:5173/#/notifications/reaching/accountOwner/slack` | `https://threshold-notifications.netlify.app/#/notifications/reaching/accountOwner/slack` |
| Account Manager | Email | `http://localhost:5173/#/notifications/reaching/accountManager/email` | `https://threshold-notifications.netlify.app/#/notifications/reaching/accountManager/email` |
| CSM | Email | `http://localhost:5173/#/notifications/reaching/csm/email` | `https://threshold-notifications.netlify.app/#/notifications/reaching/csm/email` |
| Customer Success | Email | `http://localhost:5173/#/notifications/reaching/customerSuccess/email` | `https://threshold-notifications.netlify.app/#/notifications/reaching/customerSuccess/email` |
| Customer Success | Slack | `http://localhost:5173/#/notifications/reaching/customerSuccess/slack` | `https://threshold-notifications.netlify.app/#/notifications/reaching/customerSuccess/slack` |

### Exceeding Tier

| User Type | Channel | Local URL | Production URL |
|---|---|---|---|
| Admin | Email | `http://localhost:5173/#/notifications/exceeding/admin/email` | `https://threshold-notifications.netlify.app/#/notifications/exceeding/admin/email` |
| Account Owner | Email | `http://localhost:5173/#/notifications/exceeding/accountOwner/email` | `https://threshold-notifications.netlify.app/#/notifications/exceeding/accountOwner/email` |
| Account Owner | Slack | `http://localhost:5173/#/notifications/exceeding/accountOwner/slack` | `https://threshold-notifications.netlify.app/#/notifications/exceeding/accountOwner/slack` |
| Account Manager | Email | `http://localhost:5173/#/notifications/exceeding/accountManager/email` | `https://threshold-notifications.netlify.app/#/notifications/exceeding/accountManager/email` |
| CSM | Email | `http://localhost:5173/#/notifications/exceeding/csm/email` | `https://threshold-notifications.netlify.app/#/notifications/exceeding/csm/email` |
| Customer Success | Email | `http://localhost:5173/#/notifications/exceeding/customerSuccess/email` | `https://threshold-notifications.netlify.app/#/notifications/exceeding/customerSuccess/email` |
| Customer Success | Slack | `http://localhost:5173/#/notifications/exceeding/customerSuccess/slack` | `https://threshold-notifications.netlify.app/#/notifications/exceeding/customerSuccess/slack` |

---

## Quick Reference

**Base URLs:**
- Local: `http://localhost:5173`
- Production: `https://threshold-notifications.netlify.app`

**URL Pattern:**
- Hub: `/#/hub`
- Notifications: `/#/notifications/[TIER]/[USER_TYPE]/[CHANNEL]`

**Valid Values:**
- Tiers: `approaching`, `reaching`, `exceeding`
- User Types: `admin`, `accountOwner`, `customerSuccess`, `accountManager`, `csm`
- Channels: `email`, `slack`
