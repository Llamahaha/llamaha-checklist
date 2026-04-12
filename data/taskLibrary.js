export const taskLibrary = [
  {
    id: "m365_disable_user",
    title: "Disable user in Microsoft Entra ID",
    type: "offboarding",
    systems: ["m365"],
    category: "identity",
    priority: 1,
    steps: [
      "Block sign-in in Microsoft Entra ID",
      "Revoke all active sessions",
      "Confirm user cannot authenticate"
    ]
  },
  {
    id: "ad_disable_user",
    title: "Disable Active Directory account",
    type: "offboarding",
    systems: ["ad"],
    category: "identity",
    priority: 2,
    conditions: {
      environment: ["hybrid", "onprem"]
    },
    steps: [
      "Disable AD user account",
      "Remove from privileged groups",
      "Force replication if required"
    ]
  },
  {
    id: "datto_remove_device",
    title: "Remove device from Datto RMM",
    type: "offboarding",
    systems: ["datto"],
    category: "endpoint",
    priority: 3,
    steps: [
      "Locate endpoint in Datto RMM",
      "Remove device record",
      "Confirm no active monitoring policies remain"
    ]
  },
  {
    id: "knowbe4_remove_user",
    title: "Remove user from KnowBe4 training",
    type: "offboarding",
    systems: ["knowbe4"],
    category: "training",
    priority: 4,
    steps: [
      "Remove user from active training campaigns",
      "Disable phishing simulation enrollment",
      "Archive user profile in KnowBe4"
    ]
  }
];