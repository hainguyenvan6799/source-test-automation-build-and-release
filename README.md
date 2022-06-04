Bulk Update Status plugin

1. Download the project
git clone https://github.dev.cybozu.co.jp/kintone-plugins/bulk-update-status.git
2. Download all packages to run:
- npm install
- Change script in package.json with your credentials: (kintone_baseurl, kintone_username, kintone_password) 
"scripts": { "upload": "kintone-plugin-uploader --base-url kintone_baseurl --username kintone_username --password kintone_password release/bulk_update_status_v1.0.0.zip --watch --waiting-dialog-ms 3000", }

3. If you have some changes in source, using this command to update and run:
npm run dev