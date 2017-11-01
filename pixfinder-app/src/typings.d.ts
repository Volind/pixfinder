/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

interface PFFilter {
  showImageTags: boolean;
  showPictureTags: boolean;
  showCSSImages: boolean;
  width: number;
  height: number;
}

