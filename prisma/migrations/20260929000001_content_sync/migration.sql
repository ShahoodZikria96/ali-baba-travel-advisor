-- One-time content sync for the live database. Every statement is guarded so it
-- only changes text that still matches the old value (admin edits are preserved).

-- UAE is no longer offered: unpublish (keeps the record; URL redirects to /visas).
UPDATE `Country` SET `published` = false WHERE `slug` = 'uae';

-- Contact details
UPDATE `SiteSettings` SET `email` = 'info@alibabatraveladvisor.com' WHERE `email` = 'alibabaadvisor@gmail.com';
UPDATE `SiteSettings` SET `phoneSecondary` = '+92 309 6611955' WHERE `phoneSecondary` = '+92 337 6027555';
UPDATE `SiteSettings`
  SET `announcementText` = 'Now open in Karachi — visit our DHA Phase 2 Extension office.'
  WHERE `announcementText` LIKE '%Karachi office opens Monday, 7 September 2026%';

-- Office addresses / copy
UPDATE `Office` SET `address` = REPLACE(`address`, 'Siddique Trade Center', 'Siddiq Trade Center') WHERE `slug` = 'lahore';
UPDATE `Office` SET `intro` = REPLACE(`intro`, 'Siddique Trade Center', 'Siddiq Trade Center') WHERE `slug` = 'lahore';
UPDATE `Office` SET `address` = REPLACE(`address`, 'Office No. 33 & 34, First Floor, Al-Anayat Mall', 'Office No. 33–34, Al-Anayat Mall') WHERE `slug` = 'islamabad';
UPDATE `Office` SET `intro` = REPLACE(`intro`, 'Office No. 33 & 34, First Floor,', 'Office No. 33–34,') WHERE `slug` = 'islamabad';
UPDATE `Office` SET `intro` = REPLACE(`intro`, 'Our newest office opens on Monday, 7 September 2026 at Office No. 3', 'Our newest office is at Office No. 3') WHERE `slug` = 'karachi';
UPDATE `Office` SET `localContext` = REPLACE(`localContext`, 'is being set up to serve', 'serves') WHERE `slug` = 'karachi';
UPDATE `Faq` SET `answer` = REPLACE(`answer`, 'with a new Karachi office opening 7 September 2026.', 'and a Karachi office in DHA Phase 2 Extension.');

-- Judicial review is handled by the in-house legal team
UPDATE `RefusalPage`
  SET `specialNote` = REPLACE(`specialNote`, 'we coordinate with qualified legal counsel; our own role is case assessment, documentation and consultancy.', 'our in-house legal team handles these matters; our consultants'' role is case assessment, documentation and consultancy.')
  WHERE `slug` = 'uk';
UPDATE `RefusalPage`
  SET `specialNote` = REPLACE(`specialNote`, 'and coordinate with qualified legal counsel where formal legal representation is required.', 'and our in-house legal team handles judicial review where formal legal action is required.')
  WHERE `slug` = 'canada';
