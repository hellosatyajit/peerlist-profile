interface ImportMetaEnv {
  readonly SITE_DOMAIN: string;
  readonly PEERLIST_USERNAME: string;
  readonly PRODUCT_HUNT_DEV_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
