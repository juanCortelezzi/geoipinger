import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

// This is the main layout of the app
// It wraps your pages with the providers they need
const RootLayout = () => {
  return (
    <>
      {/*
        The Stack component displays the current page.
        It also allows you to configure your screens 
      */}
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#f9a8d4",
          },
          headerTitleStyle: {
            color: "#fff",
          }
        }}
      />
      <StatusBar />
    </>
  );
};

export default RootLayout;
