# Publishing @foomo/ui

Releases are published from `main` to the public npm registry. A release is
complete only when the package version, commit, Git tag, and npm version all
match.

## Prerequisites

- `main` is current and the working tree is clean.
- Bun and npm are installed.
- `npm whoami` succeeds with an account allowed to publish `@foomo/ui`.
- The target version does not already exist in npm or Git.

```bash
git switch main
git pull --ff-only
git status --short
npm whoami
npm view @foomo/ui versions --json
git tag --list "v1.0.0"
```

## Prepare

Set the version in `package.json`, update the lockfile, and update the README or
migration notes when the public API changed.

```bash
npm pkg set version=1.0.0
bun install
```

### Update The Changelog

Keep ongoing work under `Unreleased` in `CHANGELOG.md`. Use only the headings
that have entries:

- `Added` for new capabilities.
- `Changed` for behaviour or API changes.
- `Deprecated` for APIs that remain available but will be removed.
- `Removed` for deleted APIs or support.
- `Fixed` for bug fixes.
- `Security` for vulnerability fixes.

Write entries for consumers, not as a commit log. Start each entry with the
affected component or capability, describe observable behaviour, and call out
breaking changes explicitly. Do not list internal refactors unless they affect
package behaviour, compatibility, size, or performance.

For a stable release, move all relevant entries from `Unreleased` into a new
version heading using the release date:

```markdown
## Unreleased

## 1.0.1 - 2026-09-18

### Fixed

- Dialog: restored focus to the trigger after closing.
```

For a prerelease, use the full prerelease version:

```markdown
## 1.1.0-alpha.1 - 2026-09-18
```

Do not edit a published version's entries to describe later changes. Add the
correction under `Unreleased` and release a new patch. Typographical corrections
that do not change release meaning are acceptable.

Run the complete release verification:

```bash
bunx tsc -p tsconfig.json --noEmit
bunx biome check ./src
bun run build
bun run build-storybook
npm pack --dry-run
```

Inspect the dry-run file list. It must contain the built modules, declarations,
CSS, README, and changelog, but not stories, `.migration`, source scripts, or
`node_modules`.

## Commit And Tag

Commit the exact tree that was verified, then create an annotated matching tag.
Do not publish from an uncommitted version bump: npm records the current Git
commit as `gitHead`, and that commit must contain the published version.

```bash
git add -A
git diff --cached --check
git diff --cached --stat
git commit -m "chore: release 1.0.0"
git tag -a v1.0.0 -m "Release 1.0.0"
```

Confirm that the tree is clean and the tag resolves to `HEAD`:

```bash
git status --short
test "$(git rev-parse HEAD)" = "$(git rev-list -n 1 v1.0.0)"
```

## Publish

Push the commit and tag, then publish the package. Stable releases use npm's
default `latest` tag. Prereleases must specify a prerelease dist-tag so they do
not replace `latest`.

```bash
git push origin main
git push origin v1.0.0
npm publish --access public
```

Prerelease example:

```bash
npm publish --access public --tag alpha
```

Verify the registry after publication:

```bash
npm view @foomo/ui@1.0.0 version dist-tags --json
npm view @foomo/ui dist-tags --json
```

After publication, verify that the npm version, Git tag, and changelog heading
all use the same version and that the changelog date matches the publication
date.

## Recovery

npm versions and Git tags are immutable release records. Never reuse a version
or move a published tag. If a release is broken, deprecate it, fix the issue,
and publish a new patch version.

```bash
npm deprecate @foomo/ui@1.0.0 "Use 1.0.1"
```
