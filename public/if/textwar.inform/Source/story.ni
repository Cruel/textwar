"TextWar" by "Thomas Edvalson"

Include Basic Hyperlinks by Emily Short.

Include Menus by Emily Short.

This is the testy toggle rule:
	if notify mode is on, try switching score notification off;
	otherwise try switching score notification on.

Table of Options
title	subtable (table name)	description	toggle
"Settings"	Table of Setting Options	--	--
"Hints"	Table of Hints	--	--
"Start Game"	--	"GC start game"	--

Table of Setting Options
title	subtable (table name)	description	toggle
"[if notify mode is on]Score notification on[otherwise]Score notification off[end if]"	--	--	switch notification status rule

To decide whether notify mode is on:
	(-  notify_mode -) ;

This is the switch notification status rule:
	if notify mode is on, try switching score notification off;
	otherwise try switching score notification on.

Table of Hints
title	subtable	description	toggle
"How do I reach the mastodon's jawbone?"	Table of Mastodon Hints	""	hint toggle rule
"How can I make Leaky leave me alone?"	Table of Leaky Hints	""	hint toggle rule

Table of Mastodon Hints
hint	used
"Have you tried Dr. Seaton's Patent Arm-Lengthening Medication?"	a number
"It's in the pantry."
"Under some cloths."

Table of Leaky Hints
hint	used
"Perhaps it would help if you knew something about Leaky's personality."
"Have you read the phrenology text in the library?"
"Have you found Dr. Seaton's plaster phrenology head?"
"Now you just need a way to compare this to Leaky's skull."
"Too bad he won't sit still."
"But he has been wearing a hat. Perhaps you could do something with that."
"You'll need to get it off his head first."
"Have you found the fishing pole?"
"And the wire?"
"Wait on the balcony until Leaky passes by underneath on his way to the Greenhouse."
"FISH FOR THE HAT WITH THE HOOK ON THE WIRE."
"Now you'll have to find out what the hat tells you."
"Putting it on the phrenology head might allow you to compare."
"Of course, if you do that, you'll reshape the felt. Hope you saved a game!"
"You need a way to preserve the stiffness of the hat."
"Have you found the plaster of paris?"
"And the water?"
"And the kettle?"

Understand "help" or "hint" or "hints" or "about" or "info" as asking for help.

Asking for help is an action out of world.

Carry out asking for help:
	now the current menu is the Table of Options;
	carry out the displaying activity;
	clear the screen;
	try looking.

Menu is a room. "Click [set link 1]here[end link] for help."

Leaky is a man in the Menu. Leaky wears a pair of overalls and some muddy boots. He is carrying a fishing rod.

Start is a room. It is south of Menu.

Instead of entering Start:
	try asking for help.

Table of Hyperlink Glulx Replacement Commands (continued)
linknum	replacement
1	"north"