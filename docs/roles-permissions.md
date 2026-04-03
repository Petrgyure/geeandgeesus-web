# Roles & Permissions — Gee & Geesus

## Roles

| Role | Description |
|------|-------------|
| **Visitor** | Anonymous user browsing the public site |
| **Client** | Registered user with a profile (loyalty, visit history) |
| **Owner** | Barbershop owner — manages content via manage.html |

Note: No separate "Editor" or "Admin" role needed. The two owners handle everything via the existing manage.html admin panel with GitHub token auth.

## Permission Matrix

| Capability | Visitor | Client | Owner |
|---|---|---|---|
| View homepage, services, gallery, blog, contact | Yes | Yes | Yes |
| View product showcase | Yes | Yes | Yes |
| Book via Noona (external) | Yes | Yes | Yes |
| Read blog posts | Yes | Yes | Yes |
| Create account | Yes | — | — |
| Log in | No | Yes | Yes |
| View own profile dashboard | No | Yes | Yes |
| View visit history | No | Yes | Yes |
| View loyalty points | No | Yes | Yes |
| Edit own profile settings | No | Yes | Yes |
| Delete own account | No | Yes | — |
| Edit website text (content.json) | No | No | Yes (via manage.html) |
| Manage gallery (gallery.json) | No | No | Yes (via manage.html) |
| Publish blog posts | No | No | Yes (via manage.html) |
| Deploy to production | No | No | Yes (via manage.html) |

## Auth Flow

### Client Registration
1. Visitor clicks "Vytvořit profil" on /registrace
2. Enters name, email, password
3. Receives confirmation email
4. Logs in → redirected to /profil

### Client Login
1. Client enters email + password on /prihlaseni
2. On success → redirect to /profil or previous page
3. Session persisted via secure HTTP-only cookie

### Password Reset
1. Client enters email on /zapomenute-heslo
2. Reset link sent to email
3. Client sets new password → redirected to /prihlaseni

### Owner Access
- Owners access /manage.html directly (no site auth needed)
- GitHub Personal Access Token stored in browser localStorage
- Token scoped to geeandgeesus-web repo only (Contents: read+write)
