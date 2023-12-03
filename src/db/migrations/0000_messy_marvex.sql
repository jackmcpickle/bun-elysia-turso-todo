CREATE TABLE `todos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`completed` integer DEFAULT false,
	`created_date` text DEFAULT CURRENT_TIMESTAMP,
	`updated_date` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE UNIQUE INDEX `todos_name_unique` ON `todos` (`name`);