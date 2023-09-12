DROP INDEX IF EXISTS `teamId_idx`;--> statement-breakpoint
DROP INDEX IF EXISTS `pcoId_idx`;--> statement-breakpoint
CREATE INDEX `teamId_pcoId_idx` ON `people` (`teamId`,`pcoId`);--> statement-breakpoint
CREATE INDEX `hidden_idx` ON `people` (`hidden`);