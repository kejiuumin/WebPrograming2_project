import React from "react";
import { useParams } from "react-router-dom";

export default function Game() {
  const { id } = useParams();

  return <div>Game ID: {id}</div>;
}
