-- Update the public stats to the owner-confirmed figures. Only touches rows
-- still holding the old defaults, so any value edited in the admin is kept.
ALTER TABLE `SiteSettings` ALTER COLUMN `happyCustomersStat` SET DEFAULT '7,500+';
ALTER TABLE `SiteSettings` ALTER COLUMN `youtubeSubscribers` SET DEFAULT '58,500+';
UPDATE `SiteSettings` SET `happyCustomersStat` = '7,500+' WHERE `happyCustomersStat` = '7,000+';
UPDATE `SiteSettings` SET `youtubeSubscribers` = '58,500+' WHERE `youtubeSubscribers` = '58,000+';
