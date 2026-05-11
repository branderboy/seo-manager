# midlandfloors.com — deploy steps

Three files in this folder go on the live site. Order matters.

## 1. `.htaccess` → `/public_html/.htaccess`

1. GoDaddy → File Manager → `/public_html/`
2. Right-click current `.htaccess` → Download (backup — name it `htaccess.backup`)
3. Right-click `.htaccess` → Edit → select all → paste contents of this `.htaccess` → Save
4. Test:
   ```
   curl -I https://midlandfloors.com/
   curl -I https://midlandfloors.com/shopdetail/123
   curl -I https://midlandfloors.com/wp-admin/
   ```
   - `/` should be 200
   - `/shopdetail/123` should be 410
   - `/wp-admin/` should be 200 or 302 (redirect to login)
5. If anything 500s, restore `htaccess.backup` and ping me.

**Note:** this version preserves your existing WordPress + LiteSpeed blocks intact, so WP and the cache plugin will keep auto-managing them. The new rules go above and below those blocks.

## 2. `robots.txt` → `/public_html/robots.txt`

1. File Manager → `/public_html/`
2. If `robots.txt` already exists: right-click → Edit → replace contents
3. If not: New File → name it `robots.txt` → Edit → paste
4. Test: visit `https://midlandfloors.com/robots.txt` in a browser

## 3. `sitemap.xml` → `/public_html/sitemap.xml`

**Choice point:** if midlandfloors has Yoast or RankMath installed, those plugins generate their own sitemap at `/sitemap_index.xml`. Don't replace it. Instead:

- Update `robots.txt` line `Sitemap:` to point at the plugin's sitemap URL (whichever you use)
- Skip uploading this static `sitemap.xml`

If no SEO plugin is generating a sitemap:

1. File Manager → `/public_html/` → upload `sitemap.xml`
2. Test: `https://midlandfloors.com/sitemap.xml`
3. GSC → Sitemaps → submit `https://midlandfloors.com/sitemap.xml`

## 4. After deploy

1. GSC → URL Removal → paste each prefix from `gsc-removals.txt`
2. GSC → Sitemaps → resubmit sitemap to force re-crawl
3. Wait 24–48 hours, then run the hack-scanner again to confirm `Cloaked spam: 0`
