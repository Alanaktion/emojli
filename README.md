# Emojli

An Open Source Laravel and Vue.js-based SPA implementation of Tom Scott and Matt Gray's Emojli app concept.

## Requirements

- PHP 7.1 or later (7.3 recommended)
- MySQL 5.7 or later
- Node.js (latest LTS)

## Installation

Copy `.env.example` to `.env` and update with your app configuration.

```bash
composer install
npm ci
```

### Development

```bash
npm run dev
```

Or, if you want to auto-compile the JS and CSS whenever it changes:

```bash
npm run watch
```

### Production

```bash
npm run production
```
