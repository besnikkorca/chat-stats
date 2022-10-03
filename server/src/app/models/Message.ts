import {
  Model,
  DataTypes,
  Optional,
  HasOneCreateAssociationMixin,
  HasOneSetAssociationMixin,
  NonAttribute,
  HasOneGetAssociationMixin,
  CreationOptional,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  BelongsToCreateAssociationMixin,
  Association,
} from 'sequelize';
import MetaDataExtractor from 'utils/MetaDataExtractor';
import sequelize from '../../services/db';

// Message model
export type MessageAttributes = {
  id: number;
  userId: number;
  text: string;
};

type MessageCreationAttributes = Optional<MessageAttributes, 'id'>;

export class Message extends Model<MessageAttributes, MessageCreationAttributes> {
  declare id: number;

  declare userId: number;

  declare text: string;

  declare getMessageMetaData: HasOneGetAssociationMixin<MessageMetaData>; // Note the null assertions!

  declare setMessageMetaData: HasOneSetAssociationMixin<MessageMetaData, number>;

  declare createMessageMetaData: HasOneCreateAssociationMixin<MessageMetaData>;

  declare messageMetaData?: NonAttribute<MessageMetaData>;

  declare static associations: {
    messageMetaData: Association<Message, MessageMetaData>;
  };
}

Message.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Message',
    timestamps: true,
  }
);

// MessageMetaData model
export type MessageMetaDataAttributes = {
  id: number;
  messageId: number;
  seen: boolean;
  mentions: string[];
  emoticons: string[];
  links: { url: string; title: string }[];

  createdAt: Date;
  updatedAt: Date;
};

type MessageMetaDataCreationAttributes = Optional<
  MessageMetaDataAttributes,
  'id' | 'createdAt' | 'updatedAt'
>;

export class MessageMetaData extends Model<
  MessageMetaDataAttributes,
  MessageMetaDataCreationAttributes
> {
  declare id: number;

  declare messageId: number;

  declare seen: boolean;

  declare mentions: string[];

  declare emoticons: string[];

  declare links: { url: string; title: string }[];

  declare getMessage: BelongsToGetAssociationMixin<Message>; // Note the null assertions!

  declare setMessage: BelongsToSetAssociationMixin<Message, number>;

  declare createMessage: BelongsToCreateAssociationMixin<Message>;

  declare message?: NonAttribute<Message>;

  // declare static associations: {
  //   message: Association<MessageMetaData, Message>;
  // };

  declare createdAt: CreationOptional<Date>;

  declare updatedAt: CreationOptional<Date>;
}

MessageMetaData.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    messageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    seen: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    mentions: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
      set(message: string) {
        const mentionsRegex = /@([a-zA-Z0-9_]+)/g;
        const mentions = message.match(mentionsRegex) || [];
        this.setDataValue('mentions', mentions);
      },
    },
    emoticons: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
      set(message: string) {
        const emoticonsRegex = /(?<=\()(.*?)(?=\))/g;
        const emoticons = message.match(emoticonsRegex) || [];
        this.setDataValue('emoticons', emoticons);
      },
    },
    links: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      defaultValue: [],
      set(message: string) {
        const linksRegex = /(?<=\[)(.*?)(?=\])/g;

        const links = message.match(linksRegex) || [];
        this.setDataValue(
          'links',
          links.map((textLink) => {
            const [title, url] = textLink.split('|');
            return { title, url };
          })
        );
      },
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'MessageMetaData',
    timestamps: true,
  }
);

MessageMetaData.beforeCreate(async (model) => {
  const { text } = await model.getMessage();
  const metaDataExtractor = new MetaDataExtractor(text);
  model.setDataValue('mentions', metaDataExtractor.extractMentions());
  model.setDataValue('emoticons', metaDataExtractor.extractEmoticons());
  model.setDataValue('links', metaDataExtractor.extractLinks());
});

Message.hasOne(MessageMetaData, {
  as: 'messageMetaData',
  sourceKey: 'id',
  foreignKey: 'messageId',
});
MessageMetaData.belongsTo(Message, {
  as: 'message',
  targetKey: 'id',
  foreignKey: 'messageId',
});
