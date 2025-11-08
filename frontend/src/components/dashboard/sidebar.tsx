"use client";
import { sideBarItems } from "@/app/dashboard/[userId]/page";
import { useAuth } from "@/context/authContext";
import axios from "axios";
import { LogOut, PanelLeftClose, PanelRightClose } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
