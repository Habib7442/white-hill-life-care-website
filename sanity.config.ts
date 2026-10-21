"use client"

// Embedded Studio at /studio. "use client" lets the server page pass this
// config (which holds functions) to <NextStudio />.

import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"

import { dataset, projectId } from "./sanity/env"
import { schemaTypes } from "./sanity/schemaTypes"
import { singletonTypes, structure } from "./sanity/structure"

const singletonActions = new Set(["publish", "discardChanges", "restore"])

export default defineConfig({
  name: "default",
  title: "WhiteHill Lifecares",
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [structureTool({ structure })],
  schema: {
    types: schemaTypes,
    // Site settings can't be created from "New document"; it has one fixed item.
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    actions: (actions, { schemaType }) =>
      singletonTypes.has(schemaType)
        ? actions.filter(({ action }) => action && singletonActions.has(action))
        : actions,
  },
})
