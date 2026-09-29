# Noona na novém webu Gee & Geesus — metodika

## Rozhodnutí a aktuální stav

Do doby schválení jiné rezervační technologie zůstává **Noona**. Není to obyčejný `href` jako primární integrace: na `/rezervace` je vložený widget v HTML `<iframe>`, takže návštěvník volí službu a termín bez opuštění webu. Záložní `href` otevírá veřejnou rezervaci přímo v Noona, pokud prohlížeč vložené okno zablokuje. Nejde o účet majitele ani o klientské přihlášení do webu.

- Veřejný rezervační odkaz: `https://noona.app/cs/geeandgeesus/book`
- Aktuálně vložený iframe na novém Vercel webu: `https://noona.app/cs/geeandgeesus/book?iframe=true&darkModeDisabled=true&showCancelButton=true`
- Starý WordPress web vkládá stejnou firmu z `https://noona.app/cs//geeandgeesus/book?iframe=true&darkModeDisabled=true` (Noona přesměruje dvojité lomítko). Parametry `darkModeDisabled` a `showCancelButton` jsou zachovány ze živého webu; jejich dlouhodobou podporu oficiální návod negarantuje.

## Postup od Noona

Oficiální Noona HQ návod: <https://help.noona.app/en/articles/7902267-setting-up-online-bookings-on-your-website-with-an-iframe-code>. Majitel v Noona HQ otevře **Online Bookings → Visibility**, zapne **Allow online bookings on your website** a zkopíruje vygenerovaný iframe kód. Získaný kód porovnat s `src/app/rezervace/page.tsx` a podle potřeby aktualizovat přesně URL/widget, nikoli nahradit tokenem nebo klientským heslem. Do chatu neposílat přihlašovací údaje.

Další nastavení dle <https://help.noona.app/en/articles/7022048-how-to-set-up-online-bookings>: služby, pracovníci, zdroje, blokované časy, pravidla rušení, požadované kontakty, viditelnost, notifikace a potvrzovací stránka. Otevírací hodiny uvedené v Noona samy nemusí blokovat víkendy — ověřit kalendář. Pokud se má po potvrzení měřit konverze, vyžaduje to schválený návratový URL/analytics nastavení v Noona; pouhý klik na tlačítko rezervace není dokončená objednávka.

## Kontrola před ostrým spuštěním

1. Otevřít Vercel `/rezervace` na mobilu i počítači; ověřit, že vložený výběr služeb je použitelný. DOM kontrola při viewportu 390 px naměřila **vnější** rám 342 px a bez vodorovného posunu stránky; chování **uvnitř** Noona iframe na mobilu ani dokončení rezervace tím ověřené není.
2. Ověřit záložní odkaz a shodu služby/délky/ceny v Noona a v `/sluzby`. **Ceník webu a Noona jsou oddělené zdroje** — úprava `content.json` Noonu nemění. Při změně ceny upravit obě místa a znovu porovnat. Při poslední veřejné kontrole Noona zobrazila 799 / 699 / 1 299 / 699 Kč pro střih / vousy / komplet / holení.
3. Péťa vytvořil původní web a nasadil Noonu; pokud má stále přístup do Noona HQ, ověří aktuální nastavení vložení a kalendáře přímo tam. Jednu skutečnou testovací rezervaci do provozního kalendáře však koordinovat s barbershopem, ověřit potvrzení, notifikaci a zápis a následně ji korektně zrušit. Samotná znalost implementace není pokyn vytvářet rezervaci bez domluvy.
4. Až bude schváleno nasazení, zkontrolovat zveřejněný iframe a fallback na produkční adrese. Přesměrování vlastní domény je samostatné rozhodnutí.
