export type SubGuest = {
  id: number;
  attributes: {
    name: string;
    confirmation: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
};

export type User = {
  id: number;
  attributes: {
    phone_number: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    civil_confirmation: boolean | null;
    religious_confirmation: boolean | null;
    seen: string | null;
    blocked: boolean | null;
    sub_guests: {
      data: SubGuest[];
    };
  };
};

export type UserUpdates = Partial<User['attributes']>;

export type GuestUpdates = Partial<SubGuest['attributes']>;

export type ErrorResponse = {
  status: number;
  name: string;
  message: string;
  details: Record<string, unknown>;
};

export type ApiResponse = {
  data: User;
  meta: Record<string, unknown>;
  error: ErrorResponse;
};
export type ImageFormat = {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
};

export type ImageAttributes = {
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail: ImageFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string | null;
  provider: string;
  createdAt: string;
  updatedAt: string;
};

export type ImageData = {
  id: number;
  attributes: ImageAttributes;
};

export type Image = {
  data: ImageData;
};
