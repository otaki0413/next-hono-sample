# Next.js + MUI + Prisma + Better-Auth テンプレート

Next.js 15 + TypeScript + MUI v7 + Prisma + Better Auth を使用したWebアプリケーションのテンプレートです。

## 技術スタック

- **Framework**: Next.js 15（App Router + Turbopack）
- **Language**: TypeScript
- **UI Library**: MUI (Material-UI)
- **Authentication**: Better Auth
- **Database**: PostgreSQL + Prisma ORM + Docker
- **Code Quality**: Biome（Linting & Formatting）
- **Git Hooks**: Lefthook
- **Package Manager**: pnpm

## 開発環境のセットアップ

開発サーバーを起動:

```bash
pnpm dev
```
ブラウザで [http://localhost:3000](http://localhost:3000) を開いて結果を確認してください。

## 主要コマンド

### 開発
```bash
pnpm dev          # 開発サーバー起動
pnpm build        # プロダクションビルド
pnpm start        # プロダクションサーバー起動
pnpm typecheck    # TypeScript型チェック
```

### コード品質
```bash
pnpm check        # リント・フォーマットチェック
pnpm check:fix    # 自動修正（安全・非安全）
pnpm format:      # フォーマットチェック
pnpm format:fix   # フォーマット修正のみ
```

### データベース
```bash
docker-compose up -d           # PostgreSQL 起動
npx prisma generate           # Prisma クライアント生成
npx prisma migrate dev        # マイグレーション実行
npx prisma studio            # データベース管理 UI
```

### コード品質
```bash
pnpm check        # リント・フォーマットチェック
pnpm check:fix    # 自動修正（安全・非安全）
pnpm format:fix   # フォーマット修正のみ
pnpm typecheck    # TypeScript型チェック
```

## Git ワークフロー

Lefthook により以下が自動実行されます:
- **コミット前**: コードスタイル自動修正
- **プッシュ前**: コード品質検証 + 型チェック

## 技術スタック

- [Next.js](https://nextjs.org/docs) - React フレームワーク
- [Material-UI](https://mui.com/) - React UI コンポーネント
- [Better Auth](https://www.better-auth.com/) - 認証ライブラリ
- [Prisma](https://www.prisma.io/) - データベース ORM
- [PostgreSQL](https://www.postgresql.org/) - リレーショナルデータベース
- [TypeScript](https://www.typescriptlang.org/) - 型安全な JavaScript
- [Biome](https://biomejs.dev/) - 高速ツールチェーン


### 認証フロー

1. **ランディングページ** (`/`) - 登録・ログインリンク
2. **新規登録** (`/signup`) - アカウント作成
3. **ログイン** (`/signin`) - 既存ユーザー認証
4. **ダッシュボード** (`/dashboard`) - 保護されたページ


## 参考リンク
- [Next.js](https://nextjs.org/docs)
- [MUI](https://mui.com/)
- [Prisma](https://www.prisma.io/docs)
- [PostgreSQL](https://www.postgresql.org/docs/)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [Biome](https://biomejs.dev/docs)