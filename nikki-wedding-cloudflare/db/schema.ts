import { sqliteTable,text } from 'drizzle-orm/sqlite-core';
export const settings=sqliteTable('settings',{key:text('key').primaryKey(),value:text('value').notNull()});
export const invitations=sqliteTable('invitations',{token:text('token').primaryKey(),name:text('name').notNull(),events:text('events').notNull(),rsvp:text('rsvp'),created:text('created').notNull(),kind:text('kind').notNull().default('named')});

import {integer} from 'drizzle-orm/sqlite-core';
export const loginAttempts=sqliteTable('login_attempts',{key:text('key').primaryKey(),count:integer('count').notNull(),expires:integer('expires').notNull()});
