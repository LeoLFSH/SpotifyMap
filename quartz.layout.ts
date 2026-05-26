import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/LeoLFSH/SpotifyMap",
      Spotify: "https://open.spotify.com",
    },
  }),
}

export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
    // 🏛️ ¡EL GRAFO GIGANTE AQUÍ! Si es el index, se planta en el centro del sitio
    Component.ConditionalRender({
      component: Component.Graph({
        localGraph: { depth: -1 },
        globalGraph: { depth: -1 },
      }),
      condition: (page) => page.fileData.slug === "index",
    }),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        { Component: Component.Search(), grow: true },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer(),
  ],
  // 👇 Busca esta sección dentro de tu 'right:' en quartz.layout.ts
  right: [
    // 1. Si es el INDEX, dibuja el mapa general completo
    Component.ConditionalRender({
      component: Component.Graph({
        localGraph: {
          depth: -1, 
          enableRadial: false, // 👈 ¡AÑADE ESTA LÍNEA! Apaga la fuerza circular deforme
        },
        globalGraph: {
          depth: -1,
          enableRadial: false, // 👈 Pónselo también aquí por seguridad
        },
      }),
      condition: (page) => page.fileData.slug === "index",
    }),
    // 2. Si NO es el index, el gráfico normal de 1 paso (este sí puede mantener su forma de flor)
    Component.ConditionalRender({
      component: Component.Graph(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [],
}
