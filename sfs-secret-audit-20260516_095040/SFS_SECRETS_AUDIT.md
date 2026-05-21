# SFS Secrets Audit

**Generated:** Sat May 16 09:50:42 AM UTC 2026
**Root scanned:** `.`

## Safe rule

This hides secret values. It reports names, repo usage, missing env vars, and possible leak locations only.

## Repos scanned

- `.` — `.`

## Current Replit env keys found

- `_`
- `ANTHROPIC_API_KEY`
- `APP_URL`
- `CFLAGS`
- `CLIENT_URL`
- `COLORTERM`
- `CONNECTORS_HOSTNAME`
- `CORS_ORIGIN`
- `CSRF_SECRET`
- `DATABASE_URL`
- `DISPLAY`
- `DOCKER_CONFIG`
- `__EGL_VENDOR_LIBRARY_FILENAMES`
- `GIT_ASKPASS`
- `GIT_CONFIG_GLOBAL`
- `GIT_EDITOR`
- `GI_TYPELIB_PATH`
- `GLIBC_TUNABLES`
- `HISTCONTROL`
- `HISTFILE`
- `HISTFILESIZE`
- `HISTSIZE`
- `HOME`
- `HOSTNAME`
- `LANG`
- `LD_AUDIT`
- `LDFLAGS`
- `LIBGL_DRIVERS_PATH`
- `LOCALE_ARCHIVE`
- `LS_COLORS`
- `NIX_CFLAGS_COMPILE`
- `NIX_LDFLAGS`
- `NIX_PATH`
- `NIXPKGS_ALLOW_UNFREE`
- `NIX_PROFILES`
- `npm_config_prefix`
- `OPENAI_API_KEY`
- `PACKAGES_PAT`
- `PATH`
- `PGDATABASE`
- `PGHOST`
- `PGPASSWORD`
- `PGPORT`
- `PGUSER`
- `PKG_CONFIG_PATH`
- `PKG_CONFIG_PATH_FOR_TARGET`
- `PORT`
- `PROMPT_DIRTRIM`
- `PWD`
- `REPL_HOME`
- `REPL_ID`
- `REPL_IDENTITY`
- `REPL_IDENTITY_KEY`
- `REPLIT_ARTIFACT_ROUTER`
- `REPLIT_ASKPASS_PID2_SESSION`
- `REPLIT_BASHRC`
- `REPLIT_CLI`
- `REPLIT_CLUSTER`
- `REPLIT_CONNECTORS_HOSTNAME`
- `REPLIT_CONTAINER`
- `REPLIT_DB_URL`
- `REPLIT_DEV_DOMAIN`
- `REPLIT_DOMAINS`
- `REPLIT_ENVIRONMENT`
- `REPLIT_EXPO_DEV_DOMAIN`
- `REPLIT_GITSAFE_ENABLED`
- `REPLIT_GITSAFE_EXISTING_REPLS_ENABLED`
- `REPLIT_GITSAFE_NEW_REPLS_ENABLED`
- `REPLIT_HEIMDALL_ADDR`
- `REPLIT_HELIUM_ENABLED`
- `REPLIT_LD_AUDIT`
- `REPLIT_LD_LIBRARY_PATH`
- `REPLIT_NIX_CHANNEL`
- `REPLIT_PID1_VERSION`
- `REPLIT_PID2`
- `REPLIT_PLAYWRIGHT_CHROMIUM_EXECUTABLE`
- `REPLIT_RIPPKGS_INDICES`
- `REPLIT_RTLD_LOADER`
- `REPLIT_RUN_PATH`
- `REPLIT_SESSION`
- `REPLIT_SUBCLUSTER`
- `REPLIT_USER`
- `REPLIT_USERID`
- `REPLIT_USER_RUN`
- `REPL_LANGUAGE`
- `REPL_OWNER`
- `REPL_OWNER_ID`
- `REPL_PUBKEYS`
- `REPL_SLUG`
- `SESSION_SECRET`
- `SFS_PAT`
- `SFS_SYNC_URL`
- `SFS_WEBHOOK_SECRET`
- `SHLVL`
- `STRIPE_PRICE_ENTERPRISE`
- `STRIPE_PRICE_PRO`
- `STRIPE_PRICE_STARTER`
- `STRIPE_PUBLISHABLE_TESTKEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `TERM`
- `TZDIR`
- `USER`
- `XDG_CACHE_HOME`
- `XDG_CONFIG_HOME`
- `XDG_DATA_DIRS`
- `XDG_DATA_HOME`

## Possible leaks / rotation flags


| Repo | File | Line | Issue | Action |
|---|---|---:|---|---|
| `.` | `17` | DATABASE_URL=postgresql | POSSIBLE_SECRET_VALUE_IN_FILE | ROTATE_IF_REAL_AND_REMOVE_FROM_GIT |
| `.` | `20` | # DATABASE_URL=postgresql | POSSIBLE_SECRET_VALUE_IN_FILE | ROTATE_IF_REAL_AND_REMOVE_FROM_GIT |

## Secret matrix

| Repo | Key | Code refs | Env file refs | Current Replit env | Scope | Risk | Description | Notes |
|---|---|---|---|---|---|---|---|---|
| `.` | `ANTHROPIC_API_KEY` | yes | no | **present** | SERVER_SECRET | HIGH | AI provider API key | Server only. Separate keys if you want billing split by app. |
| `.` | `ANTHROPIC` | yes | no | **missing** | UNKNOWN_REVIEW | MEDIUM | Unknown env var | Review manually and decide shared vs per-repo. |
| `.` | `APP_URL` | yes | no | **present** | UNKNOWN_REVIEW | MEDIUM | Unknown env var | Review manually and decide shared vs per-repo. |
| `.` | `CHECK_AND_REMOVE_IF_REAL_SECRET_FILE` | yes | no | **missing** | UNKNOWN_REVIEW | MEDIUM | Unknown env var | Review manually and decide shared vs per-repo. |
| `.` | `CHECKOUT_SESSION_ID` | yes | no | **missing** | UNKNOWN_REVIEW | MEDIUM | Unknown env var | Review manually and decide shared vs per-repo. |
| `.` | `CLIENT_URL` | yes | no | **present** | PER_DEPLOYMENT_CONFIG | MEDIUM | Public URL / CORS config | Not always secret, but wrong value breaks auth/API calls. |
| `.` | `CORS_ORIGINS` | yes | no | **missing** | PER_DEPLOYMENT_CONFIG | MEDIUM | Public URL / CORS config | Not always secret, but wrong value breaks auth/API calls. |
| `.` | `CORS_ORIGIN` | yes | yes | **present** | PER_DEPLOYMENT_CONFIG | MEDIUM | Public URL / CORS config | Not always secret, but wrong value breaks auth/API calls. |
| `.` | `CORS` | yes | no | **missing** | UNKNOWN_REVIEW | MEDIUM | Unknown env var | Review manually and decide shared vs per-repo. |
| `.` | `CSRF_SECRET` | yes | no | **present** | PER_REPO_PER_ENV | HIGH | Auth/session signing secret | Use strong separate values per app/env. If code expects JWT_SECRET but Replit has SFS_JWT_SECRET, app can break. |
| `.` | `DATABASE_URL` | yes | yes | **present** | PER_REPO_PER_ENV | HIGH | Database connection config | Usually separate per repo and per environment. |
| `.` | `DEBUG` | no | yes | **missing** | UNKNOWN_REVIEW | MEDIUM | Unknown env var | Review manually and decide shared vs per-repo. |
| `.` | `ENCRYPTION_KEY` | yes | no | **missing** | PER_REPO_PER_ENV | HIGH | Token/data encryption key | Separate per app/env. Rotating can break old encrypted tokens. |
| `.` | `ENVKEYS` | yes | no | **missing** | UNKNOWN_REVIEW | MEDIUM | Unknown env var | Review manually and decide shared vs per-repo. |
| `.` | `EXTERNAL_API_KEY` | yes | no | **missing** | UNKNOWN_REVIEW | MEDIUM | Unknown env var | Review manually and decide shared vs per-repo. |
| `.` | `FACEBOOK_APP_ID` | yes | no | **missing** | PER_META_APP_OR_PAGE | HIGH | Meta/Facebook token config | Rotate if found in files/logs. |
| `.` | `FACEBOOK_APP_SECRET` | yes | no | **missing** | PER_META_APP_OR_PAGE | HIGH | Meta/Facebook token config | Rotate if found in files/logs. |
| `.` | `FACEBOOK` | yes | no | **missing** | UNKNOWN_REVIEW | MEDIUM | Unknown env var | Review manually and decide shared vs per-repo. |
| `.` | `GOOGLE_CLIENT_ID` | yes | no | **missing** | PER_GOOGLE_APP | HIGH | Google OAuth config | Secret server side. Redirect URI must match deployment. |
| `.` | `GOOGLE_CLIENT_SECRET` | yes | no | **missing** | PER_GOOGLE_APP | HIGH | Google OAuth config | Secret server side. Redirect URI must match deployment. |
| `.` | `GOOGLE_REDIRECT_URI` | yes | no | **missing** | PER_GOOGLE_APP | HIGH | Google OAuth config | Secret server side. Redirect URI must match deployment. |
| `.` | `GOOGLE` | yes | no | **missing** | UNKNOWN_REVIEW | MEDIUM | Unknown env var | Review manually and decide shared vs per-repo. |
| `.` | `JWT_SECRET` | yes | no | **missing** | PER_REPO_PER_ENV | HIGH | Auth/session signing secret | Use strong separate values per app/env. If code expects JWT_SECRET but Replit has SFS_JWT_SECRET, app can break. |
| `.` | `JWT` | yes | no | **missing** | UNKNOWN_REVIEW | MEDIUM | Unknown env var | Review manually and decide shared vs per-repo. |
| `.` | `KEY` | yes | no | **missing** | UNKNOWN_REVIEW | MEDIUM | Unknown env var | Review manually and decide shared vs per-repo. |
| `.` | `LOG_LEVEL` | no | yes | **missing** | UNKNOWN_REVIEW | MEDIUM | Unknown env var | Review manually and decide shared vs per-repo. |
| `.` | `MAX_SAFE_INTEGER` | yes | no | **missing** | UNKNOWN_REVIEW | MEDIUM | Unknown env var | Review manually and decide shared vs per-repo. |
| `.` | `META_APP_ID` | yes | no | **missing** | PER_META_APP_OR_PAGE | HIGH | Meta/Facebook token config | Rotate if found in files/logs. |
| `.` | `META_APP_SECRET` | yes | no | **missing** | PER_META_APP_OR_PAGE | HIGH | Meta/Facebook token config | Rotate if found in files/logs. |
| `.` | `META` | yes | no | **missing** | UNKNOWN_REVIEW | MEDIUM | Unknown env var | Review manually and decide shared vs per-repo. |
| `.` | `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | yes | no | **missing** | PUBLIC_CONFIG | LOW | Stripe publishable frontend key | Allowed in frontend, but separate test/live. |
| `.` | `NEXT_PUBLIC_` | yes | no | **missing** | PUBLIC_FRONTEND_ENV | MEDIUM | Frontend-exposed variable | Never put real secrets here. |
| `.` | `NIX_CFLAGS_COMPILE` | yes | no | **present** | UNKNOWN_REVIEW | MEDIUM | Unknown env var | Review manually and decide shared vs per-repo. |
| `.` | `NIX_LDFLAGS` | yes | no | **present** | UNKNOWN_REVIEW | MEDIUM | Unknown env var | Review manually and decide shared vs per-repo. |
| `.` | `NIX_PATH` | yes | no | **present** | UNKNOWN_REVIEW | MEDIUM | Unknown env var | Review manually and decide shared vs per-repo. |
| `.` | `NIX_PROFILES` | yes | no | **present** | UNKNOWN_REVIEW | MEDIUM | Unknown env var | Review manually and decide shared vs per-repo. |
| `.` | `NODE_ENV` | yes | yes | **missing** | UNKNOWN_REVIEW | MEDIUM | Unknown env var | Review manually and decide shared vs per-repo. |
| `.` | `OPENAI_API_KEY` | yes | no | **present** | SERVER_SECRET | HIGH | AI provider API key | Server only. Separate keys if you want billing split by app. |
| `.` | `OPENAI` | yes | no | **missing** | UNKNOWN_REVIEW | MEDIUM | Unknown env var | Review manually and decide shared vs per-repo. |
| `.` | `PAGE_ACCESS_TOKEN` | yes | no | **missing** | PER_META_APP_OR_PAGE | HIGH | Meta/Facebook token config | Rotate if found in files/logs. |
| `.` | `PER_GOOGLE_APP` | yes | no | **missing** | UNKNOWN_REVIEW | MEDIUM | Unknown env var | Review manually and decide shared vs per-repo. |
| `.` | `PER_META_APP_OR_PAGE` | yes | no | **missing** | UNKNOWN_REVIEW | MEDIUM | Unknown env var | Review manually and decide shared vs per-repo. |
| `.` | `PER_STRIPE_ENV` | yes | no | **missing** | UNKNOWN_REVIEW | MEDIUM | Unknown env var | Review manually and decide shared vs per-repo. |
| `.` | `PGDATABASE` | yes | no | **present** | PER_REPO_PER_ENV | HIGH | Database connection config | Usually separate per repo and per environment. |
| `.` | `PGHOST` | yes | no | **present** | PER_REPO_PER_ENV | HIGH | Database connection config | Usually separate per repo and per environment. |
| `.` | `PGPASSWORD` | yes | no | **present** | PER_REPO_PER_ENV | HIGH | Database connection config | Usually separate per repo and per environment. |
| `.` | `PGPORT` | yes | no | **present** | PER_REPO_PER_ENV | HIGH | Database connection config | Usually separate per repo and per environment. |
| `.` | `PGUSER` | yes | no | **present** | PER_REPO_PER_ENV | HIGH | Database connection config | Usually separate per repo and per environment. |
| `.` | `PORT` | yes | yes | **present** | UNKNOWN_REVIEW | MEDIUM | Unknown env var | Review manually and decide shared vs per-repo. |
| `.` | `POSSIBLE_SECRET_VALUE_IN_FILE` | yes | no | **missing** | UNKNOWN_REVIEW | MEDIUM | Unknown env var | Review manually and decide shared vs per-repo. |
| `.` | `PUBLIC_BASE_URL` | yes | no | **missing** | PER_DEPLOYMENT_CONFIG | MEDIUM | Public URL / CORS config | Not always secret, but wrong value breaks auth/API calls. |
| `.` | `PUBLIC_CONFIG` | yes | no | **missing** | PUBLIC_FRONTEND_ENV | MEDIUM | Frontend-exposed variable | Never put real secrets here. |
| `.` | `PUBLIC_FRONTEND_ENV` | yes | no | **missing** | PUBLIC_FRONTEND_ENV | MEDIUM | Frontend-exposed variable | Never put real secrets here. |
| `.` | `PUBLIC_` | yes | no | **missing** | PUBLIC_FRONTEND_ENV | MEDIUM | Frontend-exposed variable | Never put real secrets here. |
| `.` | `REPL_IDENTITY_KEY` | yes | no | **present** | UNKNOWN_REVIEW | MEDIUM | Unknown env var | Review manually and decide shared vs per-repo. |
| `.` | `REPL_ID` | yes | no | **present** | UNKNOWN_REVIEW | MEDIUM | Unknown env var | Review manually and decide shared vs per-repo. |
| `.` | `REPLIT_ASKPASS_PID2_SESSION` | yes | no | **present** | UNKNOWN_REVIEW | MEDIUM | Unknown env var | Review manually and decide shared vs per-repo. |
| `.` | `REPLIT_NIX_CHANNEL` | yes | no | **present** | UNKNOWN_REVIEW | MEDIUM | Unknown env var | Review manually and decide shared vs per-repo. |
| `.` | `REPLIT_SESSION` | yes | no | **present** | UNKNOWN_REVIEW | MEDIUM | Unknown env var | Review manually and decide shared vs per-repo. |
| `.` | `REPLIT_TOKEN` | yes | no | **missing** | SHARED_CONTROL_SECRET | HIGH | Replit automation token | Control repl only. Do not place in every repo. |
| `.` | `REPL_PUBKEYS` | yes | no | **present** | UNKNOWN_REVIEW | MEDIUM | Unknown env var | Review manually and decide shared vs per-repo. |
| `.` | `SECRET_PATTERNS` | yes | no | **missing** | UNKNOWN_REVIEW | MEDIUM | Unknown env var | Review manually and decide shared vs per-repo. |
| `.` | `SECRETS_FOUND` | yes | no | **missing** | UNKNOWN_REVIEW | MEDIUM | Unknown env var | Review manually and decide shared vs per-repo. |
| `.` | `SECRET` | yes | no | **missing** | UNKNOWN_REVIEW | MEDIUM | Unknown env var | Review manually and decide shared vs per-repo. |
| `.` | `SERVER_SECRET` | yes | no | **missing** | UNKNOWN_REVIEW | MEDIUM | Unknown env var | Review manually and decide shared vs per-repo. |
| `.` | `SESSION_MAX_AGE` | yes | yes | **missing** | UNKNOWN_REVIEW | MEDIUM | Unknown env var | Review manually and decide shared vs per-repo. |
| `.` | `SESSION_NAME` | yes | yes | **missing** | UNKNOWN_REVIEW | MEDIUM | Unknown env var | Review manually and decide shared vs per-repo. |
| `.` | `SESSION_SECRET` | yes | yes | **present** | PER_REPO_PER_ENV | HIGH | Auth/session signing secret | Use strong separate values per app/env. If code expects JWT_SECRET but Replit has SFS_JWT_SECRET, app can break. |
| `.` | `SESSION` | yes | no | **missing** | UNKNOWN_REVIEW | MEDIUM | Unknown env var | Review manually and decide shared vs per-repo. |
| `.` | `SFS_AUTH_INTEGRATION` | yes | no | **missing** | UNKNOWN_REVIEW | MEDIUM | Unknown env var | Review manually and decide shared vs per-repo. |
| `.` | `SFS_BACKEND_URL` | yes | yes | **missing** | UNKNOWN_REVIEW | MEDIUM | Unknown env var | Review manually and decide shared vs per-repo. |
| `.` | `SFS_JWT_SECRET` | yes | yes | **missing** | PER_REPO_PER_ENV | HIGH | Auth/session signing secret | Use strong separate values per app/env. If code expects JWT_SECRET but Replit has SFS_JWT_SECRET, app can break. |
| `.` | `SFS_PAT` | yes | no | **present** | SHARED_CONTROL_SECRET | HIGH | GitHub token for SFS automation/repo sync | Use in GitHub org/repo secrets or selected control Replits only. Rotate if leaked. |
| `.` | `SFS_SECRETS_AUDIT` | yes | no | **missing** | UNKNOWN_REVIEW | MEDIUM | Unknown env var | Review manually and decide shared vs per-repo. |
| `.` | `SFS_SYNC_URL` | yes | no | **present** | SHARED_CONFIG_OPTIONAL | MEDIUM | Central SFS sync endpoint | Only repos that call the sync service need this. |
| `.` | `SFS_THEME` | yes | no | **missing** | UNKNOWN_REVIEW | MEDIUM | Unknown env var | Review manually and decide shared vs per-repo. |
| `.` | `SFS_WEBHOOK_SECRET` | yes | no | **present** | UNKNOWN_REVIEW | MEDIUM | Unknown env var | Review manually and decide shared vs per-repo. |
| `.` | `SFS_` | yes | no | **missing** | UNKNOWN_REVIEW | MEDIUM | Unknown env var | Review manually and decide shared vs per-repo. |
| `.` | `SHARED_CONTROL_SECRET` | yes | no | **missing** | UNKNOWN_REVIEW | MEDIUM | Unknown env var | Review manually and decide shared vs per-repo. |
| `.` | `SIDEBAR_COOKIE_MAX_AGE` | yes | no | **missing** | UNKNOWN_REVIEW | MEDIUM | Unknown env var | Review manually and decide shared vs per-repo. |
| `.` | `SIDEBAR_KEYBOARD_SHORTCUT` | yes | no | **missing** | UNKNOWN_REVIEW | MEDIUM | Unknown env var | Review manually and decide shared vs per-repo. |
| `.` | `STRIPE_PRICE_ENTERPRISE` | yes | no | **present** | SHARED_CONFIG_IF_SAME_PRODUCTS | LOW | Stripe price IDs | Can be shared if all repos use same Stripe products. |
| `.` | `STRIPE_PRICE_PRO` | yes | no | **present** | SHARED_CONFIG_IF_SAME_PRODUCTS | LOW | Stripe price IDs | Can be shared if all repos use same Stripe products. |
| `.` | `STRIPE_PRICE_STARTER` | yes | no | **present** | SHARED_CONFIG_IF_SAME_PRODUCTS | LOW | Stripe price IDs | Can be shared if all repos use same Stripe products. |
| `.` | `STRIPE_PRICE_` | yes | no | **missing** | SHARED_CONFIG_IF_SAME_PRODUCTS | LOW | Stripe price IDs | Can be shared if all repos use same Stripe products. |
| `.` | `STRIPE_PUBLISHABLE_KEY` | yes | no | **missing** | PUBLIC_CONFIG | LOW | Stripe publishable frontend key | Allowed in frontend, but separate test/live. |
| `.` | `STRIPE_PUBLISHABLE_TESTKEY` | yes | no | **present** | UNKNOWN_REVIEW | MEDIUM | Unknown env var | Review manually and decide shared vs per-repo. |
| `.` | `STRIPE_SECRET_KEY` | yes | no | **present** | PER_STRIPE_ENV | HIGH | Stripe private API key | Server only. Never expose in frontend. |
| `.` | `STRIPE_WEBHOOK_SECRET` | yes | no | **present** | PER_WEBHOOK_ENDPOINT | HIGH | Stripe webhook signing secret | Separate per webhook endpoint/domain. |
| `.` | `STRIPE` | yes | no | **missing** | UNKNOWN_REVIEW | MEDIUM | Unknown env var | Review manually and decide shared vs per-repo. |
| `.` | `TOKEN_ENCRYPTION_KEY` | yes | no | **missing** | PER_REPO_PER_ENV | HIGH | Token/data encryption key | Separate per app/env. Rotating can break old encrypted tokens. |
| `.` | `TOKENS` | yes | no | **missing** | UNKNOWN_REVIEW | MEDIUM | Unknown env var | Review manually and decide shared vs per-repo. |
| `.` | `TOKEN` | yes | no | **missing** | UNKNOWN_REVIEW | MEDIUM | Unknown env var | Review manually and decide shared vs per-repo. |
| `.` | `TWITTER_CALLBACK_URL` | yes | no | **missing** | PER_OAUTH_APP | HIGH | X/Twitter OAuth config | Per OAuth app/callback. Client secret is server only. |
| `.` | `TWITTER_CLIENT_ID` | yes | no | **missing** | PER_OAUTH_APP | HIGH | X/Twitter OAuth config | Per OAuth app/callback. Client secret is server only. |
| `.` | `TWITTER_CLIENT_SECRET` | yes | no | **missing** | PER_OAUTH_APP | HIGH | X/Twitter OAuth config | Per OAuth app/callback. Client secret is server only. |
| `.` | `TWITTER` | yes | no | **missing** | UNKNOWN_REVIEW | MEDIUM | Unknown env var | Review manually and decide shared vs per-repo. |
| `.` | `VITE_API_BASE` | yes | yes | **missing** | PUBLIC_FRONTEND_ENV | MEDIUM | Frontend-exposed variable | Never put real secrets here. |
| `.` | `VITE_API_URL` | yes | no | **missing** | PUBLIC_FRONTEND_ENV | MEDIUM | Frontend-exposed variable | Never put real secrets here. |
| `.` | `VITE_DEPRECATION_TRACE` | yes | no | **missing** | PUBLIC_FRONTEND_ENV | MEDIUM | Frontend-exposed variable | Never put real secrets here. |
| `.` | `VITE_STRIPE_PUBLISHABLE_KEY` | yes | no | **missing** | PUBLIC_CONFIG | LOW | Stripe publishable frontend key | Allowed in frontend, but separate test/live. |
| `.` | `VITE_` | yes | no | **missing** | PUBLIC_FRONTEND_ENV | MEDIUM | Frontend-exposed variable | Never put real secrets here. |
| `.` | `X_CALLBACK_URL` | yes | no | **missing** | PER_OAUTH_APP | HIGH | X/Twitter OAuth config | Per OAuth app/callback. Client secret is server only. |
| `.` | `X_CLIENT_ID` | yes | no | **missing** | PER_OAUTH_APP | HIGH | X/Twitter OAuth config | Per OAuth app/callback. Client secret is server only. |
| `.` | `X_CLIENT_SECRET` | yes | no | **missing** | PER_OAUTH_APP | HIGH | X/Twitter OAuth config | Per OAuth app/callback. Client secret is server only. |

## Output files

- `./sfs-secret-audit-20260516_095040/SFS_SECRETS_AUDIT.md`
- `./sfs-secret-audit-20260516_095040/sfs-secret-matrix.tsv`
- `./sfs-secret-audit-20260516_095040/possible-leaks.tsv`
- `./sfs-secret-audit-20260516_095040/current-replit-env-keys.txt`
