import React from "react";
import MainLayout from "../components/layouts/main-layout";
import { Input } from "@mantine/core";
import { Search } from "lucide-react";

function Home() {
  return (
    <MainLayout>
      <Input
        icon={<Search size="1rem" />}
        className="rounded-lg w-full border border-red-400 bg-transparent"
      />
    </MainLayout>
  );
}

export default Home;
