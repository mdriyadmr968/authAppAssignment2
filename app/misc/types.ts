import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Onboarding: undefined;
  AuthLanding: undefined;
  EmailAuth: undefined;
  SubmitOTP: { email: string };
  Setup: undefined;
  AuthorizedView: undefined;
  TaleCoin: undefined;
  SendAlgosOrAssests: undefined;
  Header: undefined;
  ProfileOptions: undefined;
  AssetDetails: { asset: Asset; metaData: AssetDetail };
  FAQ: undefined;
  Connect: undefined;
  KycVerification: undefined;
  KycUploadSelfie: undefined;
  CheckDocuments: undefined;
  ThankYou: undefined;
  ConfirmSend: {
    address: string;
    option: string;
    amount: string;
    balance: string;
    navigation: undefined;
  };
  KycTermsAndCondition: undefined;
  OtpVerifyForPayment: undefined;
  KycRewards: undefined;
  WelcomeRewards: undefined;
  DailyRewards: undefined;
  ReferralRewards: undefined;
  TAC: undefined;
  PrivacyPolicy: undefined;
  UploadNft: { navigation: any };
  SaleNft: { property: [] };
  SpinTheWheel: undefined;
  ADDNetwork: undefined;
  TokenDetailsPage: undefined;
  LoginWithPin: undefined;
  CryptoBasketDescription: undefined;
  ForgotPassword: undefined;
  ConfirmOTP: undefined;
  EmailLogin: undefined;
  PrivateKeyEmail: undefined;
  PrivateKeyEnterOtp: undefined;
  PrivateKeyView: undefined;
  PrivateKeyEmailPage: undefined;
  SearchPage: undefined;
  BasketSearch: undefined;
  LensSearch: undefined;
};
export type OpenURLButtonProps = {
  url: string;
  children: string;
};
export type AssetsStackParamList = {
  Assets: undefined;
  AssetDetails: { asset: Asset; metaData: AssetMetadata; nfts: any };
};

export type ProfileStackParamList = {
  ProfileOptions: undefined;
  FAQ: undefined;
  Connect: undefined;
  KycVerification: {};
  KycUploadSelfie: undefined;
  CheckDocuments: undefined;
};

export type SubmitOTPProps = NativeStackScreenProps<
  RootStackParamList,
  "SubmitOTP"
>;
export type ConfirmSendProps = NativeStackScreenProps<
  RootStackParamList,
  "ConfirmSend"
>;

export type AssetDetailsProps = NativeStackScreenProps<
  AssetsStackParamList,
  "AssetDetails"
>;
export type SaleNftProps = NativeStackScreenProps<
  RootStackParamList,
  "SaleNft"
>;

export type AuthorizedViewTabParamList = {
  Wallet: undefined;
  CryptoLens: undefined;
  Lens: undefined;
  Basket: undefined;
  AirDrop: undefined;
  Assets: undefined;
  Profile: undefined;
  Rewards: undefined;
  Cryptos: undefined;
  Home: undefined;
};

export type User = {
  userId?: number;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  mobile?: string | null;
  avatar?: string | null;
  authToken?: string | null;
  userName?: string | null;
  bio?: string | null;
  gender?: string | null;
};
export type walletAddress = [
  {
    address: string;
  }
];

export type AppSliceInitialState = {
  user: User;
  isLoggedIn: boolean;
  walletAddress: {
    blockchain: any;
    address: string;
  }[];
  authToken: string;
  frontSide: string;
  backSide: string;
  picture: string;
  cameraPicture: string;
  country: string;
  verified: boolean;
  rejection: any;
  taleAmount: any;
  nft: any;
  chain: any;
  selectedChain: any;
  selectedChainBalane: string;
  content: any;
};

export type StoreStateType = {
  app: AppSliceInitialState;
};

export type Asset = {
  amount: number;
  assetId: string;
  isFrozen: false;
  params: {
    creator: string;
    decimals: number;
    defaultFrozen: null;
    manager: string;
    name: string;
    reserve: null;
    total: string;
    unitName: null;
    url: string;
  };
};

export type AssetDetail = {
  name: string;
  description: string;
  type: string;
  collection: string;
  image: string;
  ipfsHash: string;
  properties: undefined;
};

export type AssetMetadata = {
  name: string;
  price: string;
  description: string;
  mime_type: string;
  collection: string;
  displayImageUrl: string;
  properties: null;
  ipfsHash?: string;
  image?: string;
  media_url?: string;
  standard: string;
  nfts: any;
  type: string;
};
