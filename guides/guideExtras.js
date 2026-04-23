export const vendorFaqs = {
  microsoft: [
    {
      q: "Should we troubleshoot Outlook or Teams locally before checking the tenant?",
      a: "No. Prove the user is in the right tenant, still licensed, and healthy in the browser before you rebuild the desktop app."
    },
    {
      q: "Why do open-in-app and sync problems keep crossing over?",
      a: "Because SharePoint, OneDrive, Office sign-in, and browser trust all participate in the same workflow. Treat them as one chain."
    },
    {
      q: "When should we reset MFA versus just helping the user sign in again?",
      a: "Only after confirming the issue is not the wrong account, wrong tenant, notification permissions, or a stale prompt path."
    }
  ],
  autodesk: [
    {
      q: "Does uninstalling Autodesk free the license seat?",
      a: "No. For named-user licensing, the seat is controlled in Autodesk Account. Remove or change the assignment there before treating the seat as recovered."
    },
    {
      q: "Should we install from Autodesk Access or a deployment package?",
      a: "Use the client's standard path. Autodesk supports direct installs, Autodesk Access, and admin-built deployments, so consistency matters more than using every option."
    },
    {
      q: "What account should the user sign in with?",
      a: "The exact Autodesk identity that was assigned in the admin portal. Trial prompts and missing entitlements are often just the wrong email being used."
    }
  ],
  bentley: [
    {
      q: "Why does Bentley still need CONNECTION Client?",
      a: "Many CONNECT Edition products rely on CONNECTION Client for sign-in, entitlement refresh, and license validation, so it is usually part of the supported workflow."
    },
    {
      q: "Does Bentley access stay active if the user stops signing in?",
      a: "Not always. Bentley documents token-based sign-in behavior, so expired or stale sign-ins can push products into demo or no-entitlement behavior."
    },
    {
      q: "Does removing the software reclaim the license?",
      a: "Not by itself. Reclaim the user's access or entitlement in Bentley administration first, then handle local uninstall and cleanup."
    }
  ],
  esri: [
    {
      q: "Can ArcGIS Pro be used on more than one computer?",
      a: "With Named User licensing, ArcGIS Pro can be installed on multiple machines, but an offline checkout still ties use to one machine until it is returned."
    },
    {
      q: "What is the licensing portal in ArcGIS Pro?",
      a: "It is the portal that validates the user's Named User entitlement. It can be different from the active portal used for content."
    },
    {
      q: "Why do we care about ownership before offboarding?",
      a: "Because groups, hosted layers, maps, notebooks, and other content often stay tied to the departing user unless ownership is transferred first."
    }
  ],
  ptc: [
    {
      q: "Does PTC always use the same license model?",
      a: "No. PTC products can use named-user access, floating licenses, or local file-based licensing, so the license path needs to be documented per client."
    },
    {
      q: "Where should we troubleshoot license server problems first?",
      a: "Start with the PTC license server logs and LMTOOLS or equivalent status checks. PTC guidance points there first for daemon, host, and port issues."
    },
    {
      q: "Does uninstalling the app fully reclaim access?",
      a: "Usually not. Reclaim the entitlement or license-server assignment and keep any environment or workspace settings documented."
    }
  ],
  sketchup: [
    {
      q: "How many devices can a SketchUp user run on?",
      a: "SketchUp's named-user workflow generally allows up to two active authorizations or devices for a user at one time."
    },
    {
      q: "Does SketchUp require the user to be online?",
      a: "Yes for initial sign-in and entitlement validation. If the client loses contact with SketchUp services for too long, licensing prompts can appear."
    },
    {
      q: "How do we recover a seat from an old machine?",
      a: "Use SketchUp or Trimble device-management tools to deauthorize old devices, then relaunch SketchUp and sign back in on the approved workstation."
    }
  ],
  trimble: [
    {
      q: "Should the user create a new Trimble ID for each product?",
      a: "No. Trimble recommends using the same Trimble ID across products when possible instead of creating separate identities."
    },
    {
      q: "Can users sign in with Microsoft, Google, or Apple?",
      a: "Yes in many Trimble sign-in flows, but account recovery and MFA handling then follow that identity provider's rules."
    },
    {
      q: "What MFA method should we expect on Trimble ID now?",
      a: "Trimble's current help says one-time passcodes sent to the primary email are the default second factor, with passkeys, authenticator apps, and secondary email methods also supported for non-federated users."
    }
  ],
  adobe: [
    {
      q: "Does uninstalling Adobe remove the license seat?",
      a: "No. Seat control still lives in Adobe Admin Console or the assigned product profile, so remove the assignment there as part of offboarding."
    },
    {
      q: "Why do Adobe sign-in issues happen so often?",
      a: "Because users often pick the wrong identity type or email. Managed enterprise IDs and personal Adobe IDs can coexist, and using the wrong one breaks activation."
    },
    {
      q: "When should we use the Cleaner tool?",
      a: "After normal uninstall, reinstall, or repair steps fail and the Adobe install state is clearly corrupted. Adobe positions the Cleaner tool as an advanced cleanup option."
    }
  ],
  bluebeam: [
    {
      q: "Does Revu 21 still use serial numbers and product keys?",
      a: "No for normal subscription use. Revu 21 is tied to Bluebeam subscription sign-in, while older Revu versions used serial-and-key registration."
    },
    {
      q: "Does Bluebeam Studio require a BBID?",
      a: "Yes. Bluebeam's Studio guidance says users need a Bluebeam ID and a validated email before they can access Studio."
    },
    {
      q: "Do we need to unregister before uninstalling legacy Revu?",
      a: "Yes for legacy licensed versions. Bluebeam's uninstall guidance for Revu 20 starts with unregistering the machine before removing the app."
    }
  ],
  foxit: [
    {
      q: "Does Foxit always activate the same way?",
      a: "No. Foxit environments can be subscription-based, perpetual-key based, or managed through Foxit Admin Console, and the activation flow changes with the license model."
    },
    {
      q: "Should we deactivate before uninstalling Foxit?",
      a: "Yes whenever the license model supports it. Foxit explicitly recommends deactivation so the seat can be reused on another device."
    },
    {
      q: "Can we manage Foxit plug-ins without reinstalling?",
      a: "Yes. Foxit includes plug-in management controls so admins can disable, enable, or remove certain extensions and then restart the app."
    }
  ],
  quickbooks: [
    {
      q: "Is the process the same for QuickBooks Online, Desktop, and hosted Desktop?",
      a: "No. User management, license handling, and troubleshooting differ depending on whether the client uses QuickBooks Online, local Desktop, or a hosted Desktop environment."
    },
    {
      q: "What is the best first troubleshooting tool for QuickBooks Desktop?",
      a: "Intuit's current guidance still centers on the QuickBooks Tool Hub for installation, company-file, network, and PDF or print-related issues."
    },
    {
      q: "Does uninstalling QuickBooks remove all user risk?",
      a: "No. Offboarding still needs the right company-file access removal, user-role cleanup, and confirmation that backups or hosted sessions are handed off correctly."
    }
  ],
  egnyte: [
    {
      q: "Which Egnyte user type should we normally assign?",
      a: "Egnyte's admin guidance distinguishes Admin, Power User, and Standard User roles. Employees who need normal internal file access are commonly Power Users, while Standard Users are better suited to limited external collaboration."
    },
    {
      q: "Do users need the Desktop App for every Egnyte workflow?",
      a: "No. Many workflows can stay in the Web UI, but users who need mapped-drive style access, offline files, or Windows integration usually need the Desktop App."
    },
    {
      q: "What is the main offboarding risk in Egnyte?",
      a: "It is often ownership and access, not just the account itself. Shared links, private folders, and offline files can survive longer than expected if they are not reviewed."
    }
  ]
};

export const vendorInstallIssues = {
  microsoft: [
    {
      issue: "Office or Teams installs successfully but sign-in or activation still fails",
      fix: "Confirm license assignment, usage location, tenant context, and OWA or browser access before running Office repair."
    },
    {
      issue: "OneDrive or SharePoint open-in-app behavior breaks after a workstation refresh",
      fix: "Check browser trust, Office sign-in, default associations, and whether the user is in the right tenant before resetting local sync state."
    }
  ],
  autodesk: [
    {
      issue: "Installer extracts but fails, rolls back, or stalls",
      fix: "Use the client-standard installer path, run with local admin rights, confirm pending reboots are cleared, and verify security tools or proxy controls are not blocking Autodesk downloads or updates."
    },
    {
      issue: "Product opens as trial or shows no entitlement after install",
      fix: "Confirm the user was assigned the product in Autodesk Account and that the app is signed in with the exact assigned Autodesk identity. A successful install does not prove license assignment."
    },
    {
      issue: "Uninstall leaves Autodesk components behind",
      fix: "Remove the seat first, preserve templates or shared content, then use Autodesk's supported uninstall path or cleanup guidance instead of deleting folders manually."
    }
  ],
  bentley: [
    {
      issue: "CONNECTION Client install fails",
      fix: "Bentley documents a .NET prerequisite and internet requirement when prerequisites need to download, so verify prerequisites and avoid offline installs on underprepared machines."
    },
    {
      issue: "CONNECTION Client cannot sign in",
      fix: "Check system clock drift, proxy settings, and client version first. Bentley support articles call those out as common reasons for sign-in and token failures."
    },
    {
      issue: "Updates fail when run from a non-admin Windows session",
      fix: "Bentley notes that CONNECTION Client updates should be performed from a local administrator session instead of prompting for admin credentials from a standard account."
    }
  ],
  esri: [
    {
      issue: "ArcGIS Pro cannot install or uninstall after an interrupted setup",
      fix: "Esri documents leftover install state in this scenario. Use Microsoft's install or uninstall troubleshooter, remove the broken remnants, reboot, and then reinstall."
    },
    {
      issue: "Offline use cannot be enabled",
      fix: "Verify whether ArcGIS Online blocks offline use for Named User licenses or whether concurrent borrowing is disabled on the license server. Esri documents both as common causes."
    },
    {
      issue: "Offline license cannot be returned",
      fix: "Sign in to the correct licensing portal first, then return the license. If the machine state is corrupted or the portal changed, Esri's recovery and release workflow may be required."
    }
  ],
  ptc: [
    {
      issue: "Installer fails on prerequisites or the wrong runtime",
      fix: "Use the supported installer launcher, confirm the target platform is supported, and verify the required Java or bundled runtime path instead of launching inner installer files directly."
    },
    {
      issue: "Application opens but reports an error while fetching the license",
      fix: "Check the PTC license server logs, validate host name, host ID, daemon path, and confirm the license server and vendor daemon both show as up in LMTOOLS."
    },
    {
      issue: "Install from network media behaves unpredictably",
      fix: "PTC troubleshooting guidance points to rerunning from local media and reviewing installer log paths if the media set is incomplete or the network response is too slow."
    }
  ],
  sketchup: [
    {
      issue: "SketchUp says the device limit has been reached",
      fix: "Deauthorize old devices through SketchUp or Trimble management, sign out of any stale sessions, then relaunch and sign back in on the approved machine."
    },
    {
      issue: "SketchUp cannot communicate with the entitlement server",
      fix: "Check firewall and proxy rules, confirm internet access, and retry with the assigned Trimble identity. SketchUp calls out blocked entitlement traffic as a common license error."
    },
    {
      issue: "Extensions fail right after install or upgrade",
      fix: "Update the affected extensions from Extension Warehouse or disable incompatible ones. SketchUp's help center ties many startup extension errors to outdated plug-ins."
    }
  ],
  trimble: [
    {
      issue: "User cannot finish Trimble ID setup",
      fix: "Confirm the user can receive the verification email, is using a supported browser, and is not creating a second Trimble ID when one already exists."
    },
    {
      issue: "Sign-in loop or blocked browser sign-in",
      fix: "Trimble advises using supported modern browsers and warns that embedded browsers can be blocked, so retry in Edge, Chrome, or Firefox instead of an embedded prompt."
    },
    {
      issue: "Account becomes temporarily locked during rollout",
      fix: "Trimble states accounts can lock after repeated failed attempts. Wait for the lockout window to clear, then reset the password or recover MFA instead of brute-forcing retries."
    }
  ],
  adobe: [
    {
      issue: "Adobe installer hangs, rolls back, or sticks near completion",
      fix: "Adobe points to poor connectivity, firewall blocks, and antivirus interference as common causes. Use a stable connection, clear pending reboots, and retry with the standard deployment flow."
    },
    {
      issue: "App will not uninstall cleanly",
      fix: "Use the Creative Cloud desktop app or Adobe uninstallers first. For older or damaged installs, Adobe documents reinstalling the desktop app or using the Cleaner tool."
    },
    {
      issue: "Creative Cloud install state is corrupted",
      fix: "Only after ordinary repair steps fail, use Adobe's Cleaner tool workflow to remove broken install state and then redeploy the app cleanly."
    }
  ],
  bluebeam: [
    {
      issue: "Legacy Revu cannot unregister its license",
      fix: "Bluebeam ties this to connectivity, firewall rules, or bad system time. Verify internet access, check time skew, and then retry the unregister step before uninstalling."
    },
    {
      issue: "Bluebeam Studio cannot be accessed after install",
      fix: "Confirm the version is still supported. Bluebeam documents that older Revu releases lose Studio access after end of life and must be upgraded."
    },
    {
      issue: "Uninstall appears incomplete on Revu 20",
      fix: "Bluebeam's uninstall guidance notes that the OCR component is separate, so remove both Revu and BluebeamOCR when doing a full cleanup."
    }
  ],
  foxit: [
    {
      issue: "Foxit installs but premium features remain locked",
      fix: "Verify whether the client uses sign-in activation, a perpetual key, or Admin Console assignment, then activate with the matching method instead of assuming every build uses the same flow."
    },
    {
      issue: "Seat needs to move to another machine",
      fix: "Use Foxit's deactivation or authorization-management path first so the new machine can activate cleanly without leaving the prior device in an ambiguous state."
    },
    {
      issue: "Office or PDF plug-ins are missing after install",
      fix: "Confirm the approved edition was installed, enable the needed plug-ins in Foxit, and restart the application because plug-in changes do not take effect until restart."
    }
  ],
  quickbooks: [
    {
      issue: "Install throws common Windows or registry errors such as 1402 or 1712",
      fix: "Intuit's current guidance points to the QuickBooks Tool Hub and Install Diagnostic tools first, along with confirming Windows components and pending reboots are in a healthy state."
    },
    {
      issue: "License, validation, or registration errors appear after install",
      fix: "Run the 3371 or licensing-related repair tools from Tool Hub, then review damaged registration files only through Intuit's supported workflow."
    },
    {
      issue: "QuickBooks needs a clean reinstall",
      fix: "Use Intuit's clean-install guidance through the Tool Hub rather than deleting program folders by hand, and document the exact year and edition being reinstalled."
    }
  ],
  egnyte: [
    {
      issue: "Desktop App deployment does not mount the expected drive or tenant",
      fix: "Egnyte's managed deployment guidance allows predefining domain, label, SSO, and drive-letter settings. Recheck those parameters before assuming the installer itself is broken."
    },
    {
      issue: "Desktop App install or uninstall leaves stale sync state behind",
      fix: "Review offline files and cached content before removal, then use Egnyte's supported MSI or managed-uninstall path instead of deleting folders by hand."
    },
    {
      issue: "User cannot sign in after rollout",
      fix: "Validate whether the account was created with the correct user type, SSO path, and folder permissions before troubleshooting the desktop client alone."
    }
  ]
};

export const vendorUsageIssues = {
  microsoft: [
    {
      issue: "The user is signed in but sees the wrong tenant or missing org data",
      fix: "Compare browser and desktop behavior, then sign out of the wrong tenant context before treating it as an app reinstall issue."
    },
    {
      issue: "OneDrive or SharePoint appears broken only on one workstation",
      fix: "Confirm browser truth, path hygiene, and local sync roots before escalating to the tenant or wiping the profile."
    },
    {
      issue: "Outlook prompts repeatedly after MFA or password changes",
      fix: "Verify OWA first, then clear stale identities or rebuild the local profile only if the mailbox is healthy."
    }
  ],
  autodesk: [
    {
      issue: "User sees trial prompts or missing product tiles",
      fix: "Check product assignment and confirm the user is signed in with the assigned Autodesk account, not a personal or stale cached identity."
    },
    {
      issue: "Required content libraries or add-ins are missing",
      fix: "Restore the client's templates, plug-ins, and content libraries. In many Autodesk environments the workspace payload matters as much as the base app."
    },
    {
      issue: "Plug-ins break after an update",
      fix: "Match the deployed version to the client's approved release and validate plug-in compatibility before forcing updates across the team."
    }
  ],
  bentley: [
    {
      issue: "Bentley product opens in demo mode or shows no entitlement",
      fix: "Sign out and back in to CONNECTION Client, refresh licensing policy, and verify the entitlement was actually assigned to the user."
    },
    {
      issue: "User keeps getting sign-in prompts",
      fix: "Check whether the CONNECTION Client is outdated or the token expired. Bentley notes token refresh behavior depends on the client version and active sign-in state."
    },
    {
      issue: "Workspaces or standards paths are missing",
      fix: "Verify mapped paths, shared standards folders, and project workspace configuration, because Bentley products often depend on resources outside the install directory."
    }
  ],
  esri: [
    {
      issue: "ArcGIS Pro says there are not enough licenses available",
      fix: "Review user-type assignments, expired add-on licenses, and portal URL configuration. Esri documents all three as common reasons for sign-in failure."
    },
    {
      issue: "ArcGIS Pro closes after connectivity or sign-in loss",
      fix: "Reconnect to the licensing portal or sign back in before the grace window ends. Named User licensing is sensitive to portal session state."
    },
    {
      issue: "Maps, layers, or projects are missing",
      fix: "Confirm the user is connected to the correct portal, in the right groups, and has the required extensions and role permissions."
    }
  ],
  ptc: [
    {
      issue: "User launches the app but it cannot find a license",
      fix: "Verify the workstation points at the right license source, check environment variables or config files, and confirm the server port is fixed and reachable."
    },
    {
      issue: "PLM or repository connection errors appear",
      fix: "Review DNS, hostname resolution, and service connectivity first. PTC troubleshooting frequently points to infrastructure and directory settings rather than the client install alone."
    },
    {
      issue: "Workspaces or local engineering files do not match expectations",
      fix: "Confirm the user's local workspace, vault path, and check-in state before making changes, especially during offboarding or rebuilds."
    }
  ],
  sketchup: [
    {
      issue: "SketchUp says the user is not licensed or the device is not authorized",
      fix: "Sign out, close SketchUp, relaunch it, and sign in again with the assigned Trimble ID. If needed, reset old device authorizations first."
    },
    {
      issue: "3D Warehouse or Extension Warehouse login fails",
      fix: "SketchUp points to browser session, network, and expired login issues here. Reauthenticate, test a supported browser, and retry with a stable connection."
    },
    {
      issue: "Extensions do not load or behave strangely",
      fix: "Update or disable outdated extensions, then retest. Many day-to-day SketchUp issues come from extension compatibility rather than the base install."
    }
  ],
  trimble: [
    {
      issue: "User cannot sign in to the product",
      fix: "Confirm they are using the correct Trimble ID or SSO path, then use account recovery if the password, MFA, or verification email is the real blocker."
    },
    {
      issue: "MFA or verification messages are not arriving",
      fix: "Check spam or junk folders, verify the email address in use, and fall back to Trimble's account-recovery path instead of repeated sign-in attempts."
    },
    {
      issue: "Browser-based sign-in behaves unpredictably",
      fix: "Move the user to a supported browser and avoid embedded-browser sign-in where possible, because Trimble's identity platform is stricter about browser support."
    }
  ],
  adobe: [
    {
      issue: "Adobe app keeps asking the user to sign in",
      fix: "Make sure the user is choosing the enterprise-managed identity, not a personal Adobe ID, and confirm their product profile still includes the needed app."
    },
    {
      issue: "Creative Cloud says an app is up to date even though it is gone",
      fix: "Adobe documents this as stale uninstall state. Remove the app using Adobe's supported uninstall flow and then refresh or reinstall the Creative Cloud desktop app if needed."
    },
    {
      issue: "PDF integrations or default-app behavior are wrong",
      fix: "Recheck Acrobat sign-in, browser extensions, and Office add-ins, then reset the approved default PDF handler on the workstation."
    }
  ],
  bluebeam: [
    {
      issue: "User cannot sign in to Studio",
      fix: "Verify the BBID email was validated and that the network allows the required Bluebeam domains and ports."
    },
    {
      issue: "User can join Sessions but cannot create them",
      fix: "Check the subscription tier. Bluebeam's current Studio FAQ says Basics users can join when invited, but Core or Complete is needed to create new Sessions or Projects."
    },
    {
      issue: "Collaboration problems show up between machines",
      fix: "Standardize on supported Revu versions and confirm everyone is on a current release before blaming the files themselves."
    }
  ],
  foxit: [
    {
      issue: "Foxit opens but editing or premium tools are unavailable",
      fix: "Check activation state first. The app may open successfully while still waiting for subscription sign-in, perpetual-key activation, or Admin Console authorization."
    },
    {
      issue: "Toolbar buttons or plug-ins are missing",
      fix: "Review plug-in management and restart Foxit after enabling or disabling extensions, because those changes take effect only after restart."
    },
    {
      issue: "PDFs open in the wrong app",
      fix: "Reset Windows default PDF handling after deployment or removal, especially if Adobe, Bluebeam, and Foxit coexist in the same client environment."
    }
  ],
  quickbooks: [
    {
      issue: "QuickBooks Desktop will not open or says it stopped working",
      fix: "Start with Quick Fix my Program in Tool Hub, then test whether the problem is the program itself or the company file, and move on to repair or reinstall only if needed."
    },
    {
      issue: "Company file access errors such as H202 or similar multi-user failures appear",
      fix: "Use the Tool Hub network tools on the server side, confirm hosting is enabled only where appropriate, and verify the workstation can reach the company file path."
    },
    {
      issue: "PDF or print workflows fail",
      fix: "Intuit includes PDF and print repair paths inside Tool Hub. Treat printer mapping and PDF drivers as part of the QuickBooks support workflow, not a separate afterthought."
    }
  ],
  egnyte: [
    {
      issue: "User can sign in but cannot see the expected folders",
      fix: "Review group membership, folder permissions, and whether the user was created with the correct Egnyte role before changing the desktop app."
    },
    {
      issue: "Offline files or sync behavior look wrong",
      fix: "Check whether the folder was configured for offline use intentionally and confirm the workstation still has the correct Egnyte Desktop App configuration."
    },
    {
      issue: "Departed-user content is hard to find after offboarding",
      fix: "Use Egnyte ownership, user details, and admin search views early in the offboarding instead of waiting until the account is deleted and the content path becomes unclear."
    }
  ]
};


