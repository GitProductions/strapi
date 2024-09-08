import type { Schema, Attribute } from '@strapi/strapi';

export interface BlocksCta extends Schema.Component {
  collectionName: 'components_blocks_ctas';
  info: {
    displayName: 'Cta';
  };
  attributes: {
    heading: Attribute.String;
    description: Attribute.Text;
    form: Attribute.Component<'elements.form'>;
  };
}

export interface BlocksHero extends Schema.Component {
  collectionName: 'components_blocks_heroes';
  info: {
    displayName: 'Hero';
    description: '';
  };
  attributes: {
    heading: Attribute.Text;
    text: Attribute.Text;
    link: Attribute.Component<'elements.button-link', true> &
      Attribute.SetMinMax<
        {
          max: 2;
        },
        number
      >;
    image: Attribute.Media;
    imageQuote: Attribute.Text;
  };
}

export interface BlocksPricing extends Schema.Component {
  collectionName: 'components_blocks_pricings';
  info: {
    displayName: 'Pricing';
  };
  attributes: {
    name: Attribute.String;
    description: Attribute.Text;
    plan: Attribute.Component<'elements.pricing-card', true>;
  };
}

export interface BlocksRow extends Schema.Component {
  collectionName: 'components_blocks_rows';
  info: {
    displayName: 'Row';
    description: '';
  };
  attributes: {
    card: Attribute.Component<'elements.card', true>;
    cardDescription: Attribute.Component<'elements.card-item', true>;
  };
}

export interface ElementsButtonLink extends Schema.Component {
  collectionName: 'components_elements_button_links';
  info: {
    displayName: 'Button Link';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    link: Attribute.String;
    isExternal: Attribute.Boolean & Attribute.DefaultTo<false>;
    type: Attribute.Enumeration<['PRIMARY', 'SECONDARY']>;
    Images: Attribute.Media;
  };
}

export interface ElementsCardItem extends Schema.Component {
  collectionName: 'components_elements_card_items';
  info: {
    displayName: 'CardItem';
    description: '';
  };
  attributes: {
    text: Attribute.Text;
  };
}

export interface ElementsCard extends Schema.Component {
  collectionName: 'components_elements_cards';
  info: {
    displayName: 'Card';
    description: '';
  };
  attributes: {
    image: Attribute.Media;
    heading: Attribute.String;
    descriptionNormal: Attribute.Component<'elements.card-item', true>;
    descriptionHover: Attribute.Component<'elements.card-item', true>;
  };
}

export interface ElementsDevCard extends Schema.Component {
  collectionName: 'components_elements_dev_cards';
  info: {
    displayName: 'PortfolioCard';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text;
    descriptionLong: Attribute.Text;
    Image: Attribute.Media;
    Button: Attribute.Component<'elements.portfolio-card-button'>;
    isFeatured: Attribute.Boolean & Attribute.DefaultTo<false>;
  };
}

export interface ElementsForm extends Schema.Component {
  collectionName: 'components_elements_forms';
  info: {
    displayName: 'Form';
  };
  attributes: {
    heading: Attribute.String;
    description: Attribute.Text;
    input: Attribute.Component<'elements.input', true>;
    button: Attribute.Component<'elements.button-link'>;
  };
}

export interface ElementsInput extends Schema.Component {
  collectionName: 'components_elements_inputs';
  info: {
    displayName: 'Input';
    description: '';
  };
  attributes: {
    placeholder: Attribute.String;
    label: Attribute.String;
  };
}

export interface ElementsPortfolioCardButton extends Schema.Component {
  collectionName: 'components_elements_portfolio_card_buttons';
  info: {
    displayName: 'PortfolioCardButton';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.DefaultTo<'View Project'>;
    link: Attribute.String;
    isExternal: Attribute.Boolean & Attribute.DefaultTo<false>;
    type: Attribute.Enumeration<['PRIMARY', 'SECONDARY']> &
      Attribute.DefaultTo<'SECONDARY'>;
  };
}

export interface ElementsPricingCard extends Schema.Component {
  collectionName: 'components_elements_pricing_cards';
  info: {
    displayName: 'Pricing Card';
  };
  attributes: {
    planType: Attribute.String;
    planPrice: Attribute.String;
    isFeatured: Attribute.Boolean & Attribute.DefaultTo<false>;
    services: Attribute.Relation<
      'elements.pricing-card',
      'oneToMany',
      'api::service.service'
    >;
    link: Attribute.Component<'elements.button-link'>;
  };
}

export interface SeoMetaData extends Schema.Component {
  collectionName: 'components_seo_meta_data';
  info: {
    displayName: 'Meta Data';
  };
  attributes: {
    metaTitle: Attribute.String;
    metaDescription: Attribute.Text;
    metaImage: Attribute.Media;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'blocks.cta': BlocksCta;
      'blocks.hero': BlocksHero;
      'blocks.pricing': BlocksPricing;
      'blocks.row': BlocksRow;
      'elements.button-link': ElementsButtonLink;
      'elements.card-item': ElementsCardItem;
      'elements.card': ElementsCard;
      'elements.dev-card': ElementsDevCard;
      'elements.form': ElementsForm;
      'elements.input': ElementsInput;
      'elements.portfolio-card-button': ElementsPortfolioCardButton;
      'elements.pricing-card': ElementsPricingCard;
      'seo.meta-data': SeoMetaData;
    }
  }
}
