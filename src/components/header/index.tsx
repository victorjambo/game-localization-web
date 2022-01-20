import Head from "next/head";

const Header: React.FC<{ title?: string }> = ({ title = "Game localization" }) => {
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
};

export default Header;
