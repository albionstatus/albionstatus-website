CREATE TABLE `statuses` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`server` text NOT NULL,
	`type` text NOT NULL,
	`message` text NOT NULL,
	`comment` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_statuses_server_created` ON `statuses` (`server`,`created_at`);