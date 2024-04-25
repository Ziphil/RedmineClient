<div align="center">
<h1>ぼくのかんがえたさいきょうの Redmine クライアント</h1>
</div>


## 使い方
### API キーの確認
Redmine のマイページを開き、ページ右部に記載されている API キーをコピーしておいてください。

### インストール
1. [Actions のページ](https://github.com/Ziphil/RedmineClient/actions/workflows/deploy.yml)に移動
2. 表示されているリストの一番上をクリック
3. ページ下部の「Artifacts」欄で OS に合ったものをクリック
4. ダウンロードした ZIP ファイルを解凍
5. 中にあるインストーラを起動

### 設定
以下の場所に `settings.json` を作ってください。

- Windows — `%APPDATA%/redmine-client`
- Mac OS — `~/Library/Application Support/redmine-client`

その上で、以下の内容を書き込んでください。

```json
{
  "redmineUrl": "https://vildas.cloudmine.jp",
  "redmineKey": "(API キー)"
}
```

`redmineUrl` と `redmineKey` 以外にも、任意で設定できる項目があります。
詳細は以下をご覧ください。

## 設定項目
### `activityId`
作業時間を記録する際に指定する作業分類の ID です。
デフォルトは `9` です。

### `exceptionalOffDates`
追加の休日です。
`YYYY-MM-DD` 形式の文字列の配列を指定してください。

デフォルトでは、週末と祝日が休日扱いされ、最初に表示されるタイムラインから除外されます。
ここに追加の休日を設定しておくと、その日も除外されるようになります。

```json
"exceptionalOffDates": [
  "2024-01-01",
  "2024-03-06"
],
```

### `projectPriorities`
プロジェクトの表示優先度です。
`[(ID), (優先度)]` という形のタプルの配列を指定してください。

最初に表示されるタイムラインでは、優先度が高いものが上に表示され、優先度が同じものは後に作られたものが上に表示されます。
この設定により、プロジェクトの優先度を変更して、特定のプロジェクトの表示位置を調整することができます。
優先度のデフォルトは 0 です。

例えば、`[13, 1]` を設定すると、ID 13 のプロジェクトの優先度が 1 になり、一番上に表示されます。
また、`[6, -1]` を設定すると、ID 6 のプロジェクトの優先度が −1 になり、一番下に表示されます。

```json
"projectPriorities": [
  [13, 1],
  [6, -1],
  [8, -1]
]
```