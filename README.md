# House800

家をコンセプトにした個人サイト「House800」のソースコードです。

公開サイト: https://the-web800.github.io/

## 技術構成

- Astro
- Svelte (一部、AstroのIslandとして使用)
- Tailwind CSS
- TypeScript
- Biome
- pnpm
- GitHub Pages

[技術について簡単に説明したページ](https://the-web800.github.io/blog/c/h8_specs)もご覧ください。

## 必要な環境

- Node.js（`package.json` の `engines` を参照）
- pnpm
- lychee（リンク切れチェッカー）

## 開発方法

1. 依存パッケージをインストールします。

```sh
pnpm install
```

2. 開発サーバーを起動します。

```sh
pnpm dev
```

## コマンド

| コマンド | 説明 |
| --- | --- |
| `pnpm dev` | 開発サーバーを起動 |
| `pnpm build` | 本番用ビルド |
| `pnpm preview` | ビルド結果をローカルで確認 |
| `pnpm check:links` | リンク切れチェック |
| `pnpm check:biome` | Biomeチェック |
| `pnpm check:write` | Biomeチェック&書き換え |

## デプロイ

GitHub Actionsを使用して、GitHub Pagesで公開しています。

## ライセンス

ライセンスの適用範囲と詳細は、 [`LICENSE.md`](./LICENSE.md) を参照してください。
