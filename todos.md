# To Do

### Implement components

[shad-cn](https://www.shadcn-vue.com/) for most components (individually installed)

[Daisy UI](https://daisyui.com/) mainly for:

- keyboard controls
- code mockups
- masks
- diff

[Radix UI tree](https://www.radix-vue.com/components/tree.html)

See this [reddit post](https://www.reddit.com/r/vuejs/comments/18ecyja/vue_ui_kitscomponent_libraries/?rdt=37912)

### Implement logic structure

When creating a new program, it should be backed by a vmix preset file.

- Programs should be given a unique name (possibly UUID also) and saved with a pointer to the vmix save file they were created from

### Change `prepareNext` to `prepare`

Currently, each scene knows how to prepare for the next scene. A better approach would be for each scene to specify what preparations it needs in order to be transitioned to correctly. The program could then call the next scene's prepare portion after transition to make sure it's setup.

### Add context menu to scene list

This would allow access to scene methods such as Prepare() that can be called at any time

### Add support for `$ref` property in scene JSON

This property will allow for a scene to reference another scene by name or ID and utilize the same properties as the referenced scene with a different title.

### Change `active` and `alternate`

These views should be `primary` and `secondary` and there should be explicit actions for bringing up either view.

### Make scenes separate from a Program

Scenes can be created in isolation, given an ID, and programs will just be a list of scene IDs. This allows for different programs to be created using the same scenes. It also will allow for a UI component that allows a scene to be transitioned to from a list of scenes which might not be included in the current program.
