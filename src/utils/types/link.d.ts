declare interface ILinkWidgetConfig extends IWidgetConfig {
  links: LinkDetails[];
}

declare type LinkDetails = {
  title?: string;
  href?: string;
  sametab?: boolean;
};
