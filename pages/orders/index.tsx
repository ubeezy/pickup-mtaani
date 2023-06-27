import Head from "next/head";
import React from "react";

import { useGetJokesQuery } from "../../redux/hooks";
import DataGrid from "../../components/table";

export default function Orders() {
  const { data, isLoading, error } = useGetJokesQuery();

  if (error) {
    return <div>Error: Unable to fetch jokes</div>;
  }

  return (
    <React.Fragment>
      <Head>
        <title>Orders |  </title>
      </Head>
      <DataGrid
        rows={data ?? []}
        loading={isLoading}
      />
    </React.Fragment>
  );
}