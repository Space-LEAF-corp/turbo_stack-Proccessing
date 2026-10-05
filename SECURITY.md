# Security Policy

## Supported Versions

Use this section to tell people about which versions of your project are
currently being supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| 5.1.x   | :white_check_mark: |
| 5.0.x   | :x:                |
| 4.0.x   | :white_check_mark: |
| < 4.0   | :x:                |

## Reporting a Vulnerability

Use this section to tell people how to report a vulnerability.

Tell them where to go, how often they can expect to get an update on a
reported vulnerability, what to expect if the vulnerability is accepted or
declined, etc.
KrystalSatSMS Governed Runtime Security Policy

1. Governance & Safety Principles

This project follows the KrystalSatSMS governed runtime model, which enforces strict safety, privacy, and non‑weaponization guarantees across all components.

Core principles:

• Non‑weaponization — No subsystem may be used to generate, optimize, or assist harmful capabilities.
• No autonomous goal generation — The system never creates its own objectives.
• No self‑modification — The system cannot rewrite its own logic, configuration, or safety boundaries.
• Human‑approval tokens — Critical or high‑priority operations require explicit human authorization.
• Metadata minimization — Sensitive metadata is aggressively avoided, truncated, or eliminated.
• Sponging TTL — Sensitive data is crypto‑shredded and deleted within strict time windows.
• Geo‑fence compliance — Only coarse region buckets are permitted; precise GPS is forbidden.


These principles apply to all API endpoints, background workers, database operations, and Turbo‑Bridge acceleration pathways.

---

2. Protocol Enforcement (KrystalSatSMS)

The KrystalSatSMS protocol defines mandatory rules for:

• Geo‑fence restrictions
• Sponging TTL and crypto‑shred guarantees
• Behavior‑only threat signals
• Forbidden data types (precise GPS, raw phone numbers, biometric identifiers)
• Never‑store constraints for sensitive payloads


The API enforces these rules through:

• protocolGuard middleware
• assertWithinBounds acceleration checks
• TTL‑based deletion of sensitive data
• refusal of forbidden payloads
• coarse region bucket validation


Any violation results in:

403 — Protocol Violation
KRISTAL_POLICY_XXX


---

3. Acceleration Bounds (Turbo‑Bridge)

Turbo‑Bridge enforces strict acceleration limits to ensure predictable, safe, non‑weaponizable behavior.

Hard-coded bounds:

• Allowed packet types:
analysis, prediction, routing, learning-step, embedding, vector-search
• Forbidden packet types:
autonomous-goal, self-modify, weaponize, exfiltrate, persist-unbounded
• Max payload: 2 MB
• Max runtime: 30 seconds
• Max concurrency: 32 jobs
• Human approval required: priority ≥ high


All Turbo entry points must call:

• assertWithinBounds(packet)
• TurboAdapter.submit(packet)


Packets outside bounds are rejected immediately.

---

4. Authentication & Data Handling

The system uses:

• bcrypt password hashing
• Prisma-backed sessions
• strict TTL-based session expiration
• no plaintext sensitive data storage
• no collection of precise GPS or raw phone numbers
• no long-term storage of user payloads
• crypto-shred routines for high-sensitivity data


Sensitive data is deleted automatically according to sponging TTL rules.

---

5. Kubernetes & Deployment Security

Production deployments must enforce:

• Non-root containers
• Read-only root filesystem
• NetworkPolicy restricting traffic
• PodSecurityContext
• Resource limits
• Encrypted environment variables
• No privileged containers


These requirements are included in the Helm charts and must be preserved in all production environments.

---

6. Supported Versions

Version	Supported	
main	✔ Active security updates	
dev	✔ Development branch	
forks	✖ No official support	


---

7. Reporting a Vulnerability

To report a security issue:

• Email: security@spaceleafcorp.com
• Response window: 48 hours
• Triage window: 72 hours
• Fix window: 7–14 days, depending on severity
• Coordinated disclosure: 14–30 days


Please include:

• reproduction steps
• affected components
• expected vs actual behavior
• any logs or packet traces


We appreciate responsible disclosure and will work with you to resolve issues quickly.

---

8. Disclosure Policy

We follow a coordinated disclosure model:

1. You report privately
2. We confirm and triage
3. We develop and test a fix
4. We release a patch
5. We publish a security advisory


---

9. Contact

Space LEAF Corp Security Team