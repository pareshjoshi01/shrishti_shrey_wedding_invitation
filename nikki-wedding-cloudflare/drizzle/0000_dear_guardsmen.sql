CREATE TABLE `invitations` (
	`token` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`events` text NOT NULL,
	`rsvp` text,
	`created` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `settings` (
	`key` text PRIMARY KEY NOT NULL,
	`value` text NOT NULL
);
