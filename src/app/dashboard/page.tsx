"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";

import { signOut, useSession } from "~/lib/auth-client";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/signin");
    }
  }, [isPending, session, router]);

  if (isPending) {
    return (
      <Container maxWidth="sm">
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (!session?.user) {
    return (
      <Container maxWidth="sm">
        <Box
          sx={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography>Redirecting...</Typography>
        </Box>
      </Container>
    );
  }

  const { user } = session;

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Typography component="h1" variant="h4" gutterBottom={true}>
          Dashboard
        </Typography>
        <Typography variant="h6">Welcome, {user.name || "User"}!</Typography>
        <Typography variant="body1" color="text.secondary">
          Email: {user.email}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          fullWidth={true}
          onClick={() => signOut()}
          sx={{ mt: 2 }}
        >
          Sign Out
        </Button>
      </Box>
    </Container>
  );
}
