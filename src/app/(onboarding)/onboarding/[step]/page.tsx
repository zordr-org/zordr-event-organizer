"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  Building2,
  Camera,
  Check,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  FileCheck2,
  FileText,
  Image as ImageIcon,
  Info,
  Landmark,
  Link as LinkIcon,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Upload,
  User,
  WalletCards,
} from "lucide-react";

type StepNumber = 1 | 2 | 3 | 4 | 5;

type UploadedFile = {
  file: File;
  url: string;
  name: string;
  type: string;
};

// Keeps the actual File objects available while moving between onboarding steps
// without changing the existing page structure or design.
const onboardingFileStore: {
  logo: UploadedFile | null;
  documents: Record<string, UploadedFile | null>;
} = {
  logo: null,
  documents: {},
};

const revokeStoredUrl = (item: UploadedFile | null) => {
  if (item?.url) URL.revokeObjectURL(item.url);
};

const saveUploadedFile = (key: string, file: File) => {
  const previous = onboardingFileStore.documents[key] ?? null;
  revokeStoredUrl(previous);

  const uploaded: UploadedFile = {
    file,
    url: URL.createObjectURL(file),
    name: file.name,
    type: file.type,
  };

  onboardingFileStore.documents[key] = uploaded;
};

const saveLogoFile = (file: File) => {
  revokeStoredUrl(onboardingFileStore.logo);

  onboardingFileStore.logo = {
    file,
    url: URL.createObjectURL(file),
    name: file.name,
    type: file.type,
  };
};

const steps = [
  {
    number: 1,
    title: "Organization Details",
  },
  {
    number: 2,
    title: "Contact & Address",
  },
  {
    number: 3,
    title: "Payout Details",
  },
  {
    number: 4,
    title: "Documents (Optional)",
  },
  {
    number: 5,
    title: "Review & Submit",
  },
];

export default function OnboardingStepPage() {
  const params = useParams();
  const router = useRouter();

  const rawStep = Array.isArray(params.step)
    ? params.step[0]
    : params.step;

  const parsedStep = Number(rawStep);

  const currentStep: StepNumber =
    parsedStep >= 1 && parsedStep <= 5
      ? (parsedStep as StepNumber)
      : 1;

  const [organizationName, setOrganizationName] =
    useState("KITSW Cultural Club");

  const [organizationType, setOrganizationType] = useState(
    "College Club / Student Body"
  );

  const [contactName, setContactName] =
    useState("Rohit Varma");

  const [mobile, setMobile] =
    useState("98765 43210");

  const [email, setEmail] =
    useState("rohit.varma@kitsw.ac.in");

  const [alternateContact, setAlternateContact] =
    useState("");

  const [address, setAddress] = useState(
    "Kakatiya Institute of Technology and Science, Warangal"
  );

  const [city, setCity] = useState("Warangal");

  const [state, setState] = useState("Telangana");

  const [pincode, setPincode] = useState("506015");

  const [officialEmail, setOfficialEmail] =
    useState("contact@kitswclub.in");

  const [publicContact, setPublicContact] =
    useState("98765 43210");

  const [website, setWebsite] =
    useState("https://www.yourclub.in");

  const [instagram, setInstagram] =
    useState("@kitsw_cultural");

  const [fullAddress, setFullAddress] = useState(
    "Kakatiya Institute of Technology and Science,\nOpp. Yerragattu Gutta, Warangal – 506015"
  );

  const [mapsLink, setMapsLink] =
    useState("https://maps.google.com/?q=KITSW");

  const [accountHolder, setAccountHolder] =
    useState("KITSW Cultural Club");

  const [accountNumber, setAccountNumber] =
    useState("5012 3456 7890");

  const [confirmAccountNumber, setConfirmAccountNumber] =
    useState("5012 3456 7890");

  const [ifsc, setIfsc] =
    useState("HDFC0001234");

  const [bankName, setBankName] =
    useState("HDFC Bank");

  const [branchName, setBranchName] =
    useState("Warangal Main Branch");

  const [upiId, setUpiId] =
    useState("kitswclub@okhdfcbank");

  const [fileVersion, setFileVersion] = useState(0);

  const logoUploaded = Boolean(onboardingFileStore.logo);
  const panUploaded = Boolean(onboardingFileStore.documents.pan);
  const gstUploaded = Boolean(onboardingFileStore.documents.gst);
  const registrationUploaded = Boolean(onboardingFileStore.documents.registration);
  const otherDocumentUploaded = Boolean(onboardingFileStore.documents.other);

  const handleLogoUpload = (file: File) => {
    saveLogoFile(file);
    setFileVersion((version) => version + 1);
  };

  const handleDocumentUpload = (key: string, file: File) => {
    saveUploadedFile(key, file);
    setFileVersion((version) => version + 1);
  };

  const handleDocumentView = (key: string) => {
    const uploaded = onboardingFileStore.documents[key];
    if (uploaded?.url) {
      window.open(uploaded.url, "_blank", "noopener,noreferrer");
    }
  };

  const [submitted, setSubmitted] =
    useState(false);

  useEffect(() => {
    if (!rawStep || parsedStep < 1 || parsedStep > 5) {
      router.replace("/onboarding/1");
    }
  }, [rawStep, parsedStep, router]);

  const goToStep = (step: number) => {
    if (step >= 1 && step <= 5) {
      router.push(`/onboarding/${step}`);
    }
  };

  const handleNext = () => {
    if (currentStep < 5) {
      goToStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      goToStep(currentStep - 1);
    }
  };

  const handleBack = () => {
    if (currentStep === 1) {
      router.push("/login");
      return;
    }

    goToStep(currentStep - 1);
  };

  const handleSubmit = () => {
  setSubmitted(true);

  // Save onboarding completion
  localStorage.setItem("onboardingCompleted", "true");

  router.push("/onboarding/status");
};

  const pageTitle = useMemo(() => {
    switch (currentStep) {
      case 1:
        return "Tell us about your organization";
      case 2:
        return "Contact & Address";
      case 3:
        return "Payout Details";
      case 4:
        return "Documents";
      case 5:
        return "Review & Submit";
      default:
        return "Tell us about your organization";
    }
  }, [currentStep]);

  void fileVersion;

  return (
    <div className="min-h-screen bg-[#f7faf9] p-3 md:p-4">
      <div className="mx-auto flex min-h-[calc(100vh-24px)] max-w-[1540px] overflow-hidden rounded-[20px] border border-[#dfe8e5] bg-white shadow-[0_8px_35px_rgba(15,23,42,0.08)]">
        <Sidebar
          currentStep={currentStep}
          onStepClick={goToStep}
        />

        <main className="min-w-0 flex-1">
          <TopHelp />

          <div className="h-full overflow-y-auto px-6 pb-8 pt-4 md:px-10 lg:px-12">
            {currentStep !== 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#24324b] transition hover:text-[#0eae73]"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
            )}

            {currentStep === 1 && (
              <StepOne
                organizationName={organizationName}
                setOrganizationName={setOrganizationName}
                organizationType={organizationType}
                setOrganizationType={setOrganizationType}
                contactName={contactName}
                setContactName={setContactName}
                mobile={mobile}
                setMobile={setMobile}
                email={email}
                setEmail={setEmail}
                alternateContact={alternateContact}
                setAlternateContact={setAlternateContact}
                address={address}
                setAddress={setAddress}
                city={city}
                setCity={setCity}
                state={state}
                setState={setState}
                pincode={pincode}
                setPincode={setPincode}
                logoUploaded={logoUploaded}
                logoFile={onboardingFileStore.logo}
                onLogoUpload={handleLogoUpload}
                onCancel={() => router.push("/login")}
                onNext={handleNext}
              />
            )}

            {currentStep === 2 && (
              <StepTwo
                officialEmail={officialEmail}
                setOfficialEmail={setOfficialEmail}
                publicContact={publicContact}
                setPublicContact={setPublicContact}
                website={website}
                setWebsite={setWebsite}
                instagram={instagram}
                setInstagram={setInstagram}
                fullAddress={fullAddress}
                setFullAddress={setFullAddress}
                city={city}
                setCity={setCity}
                state={state}
                setState={setState}
                pincode={pincode}
                setPincode={setPincode}
                mapsLink={mapsLink}
                setMapsLink={setMapsLink}
                onPrevious={handlePrevious}
                onNext={handleNext}
              />
            )}

            {currentStep === 3 && (
              <StepThree
                accountHolder={accountHolder}
                setAccountHolder={setAccountHolder}
                accountNumber={accountNumber}
                setAccountNumber={setAccountNumber}
                confirmAccountNumber={confirmAccountNumber}
                setConfirmAccountNumber={setConfirmAccountNumber}
                ifsc={ifsc}
                setIfsc={setIfsc}
                bankName={bankName}
                setBankName={setBankName}
                branchName={branchName}
                setBranchName={setBranchName}
                upiId={upiId}
                setUpiId={setUpiId}
                onPrevious={handlePrevious}
                onNext={handleNext}
              />
            )}

            {currentStep === 4 && (
              <StepFour
                panUploaded={panUploaded}
                gstUploaded={gstUploaded}
                registrationUploaded={registrationUploaded}
                otherDocumentUploaded={otherDocumentUploaded}
                onUpload={handleDocumentUpload}
                onView={handleDocumentView}
                onPrevious={handlePrevious}
                onNext={handleNext}
              />
            )}

            {currentStep === 5 && (
              <StepFive
                organizationName={organizationName}
                organizationType={organizationType}
                contactName={contactName}
                email={email}
                mobile={mobile}
                address={address}
                city={city}
                state={state}
                pincode={pincode}
                accountHolder={accountHolder}
                accountNumber={accountNumber}
                ifsc={ifsc}
                bankName={bankName}
                branchName={branchName}
                upiId={upiId}
                panUploaded={panUploaded}
                gstUploaded={gstUploaded}
                registrationUploaded={
                  registrationUploaded
                }
                otherDocumentUploaded={
                  otherDocumentUploaded
                }
                onViewDocument={handleDocumentView}
                submitted={submitted}
                onPrevious={handlePrevious}
                onSubmit={handleSubmit}
                onEdit={goToStep}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

/* =========================================================
   SIDEBAR
========================================================= */

function Sidebar({
  currentStep,
  onStepClick,
}: {
  currentStep: StepNumber;
  onStepClick: (step: number) => void;
}) {
  return (
    <aside className="relative hidden w-[330px] shrink-0 overflow-hidden border-r border-[#e3ebe8] bg-[linear-gradient(180deg,#f5fbf9_0%,#eef8f5_70%,#e9f4f1_100%)] lg:block">
      <div className="relative z-10 flex h-full flex-col px-10 py-9">
        <div>
          <div className="flex items-center">
            <div className="text-[54px] font-black leading-none tracking-[-5px] text-[#111827]">
              <span className="text-[#08b77b]">Z</span>
              <span>ordr</span>
            </div>
          </div>

          <p className="mt-0.5 text-[14px] font-medium tracking-[-0.1px] text-[#34445f]">
            Events. Experiences. Together.
          </p>
        </div>

        {currentStep === 1 && (
          <div className="mt-20">
            <h2 className="max-w-[250px] text-[38px] font-bold leading-[1.08] tracking-[-1.5px] text-[#101827]">
              Let&apos;s get
              <br />
              <span className="text-[#0db77a]">
                you started!
              </span>
            </h2>

            <p className="mt-4 max-w-[245px] text-[19px] leading-7 text-[#60708d]">
              Complete your organizer profile to start
              creating amazing events on Zordr.
            </p>
          </div>
        )}

        <div
          className={`${
            currentStep === 1 ? "mt-10" : "mt-16"
          } relative`}
        >
          <div className="absolute left-[23px] top-[28px] bottom-[28px] w-px bg-[#cbd7dc]" />

          <div className="space-y-4">
            {steps.map((step) => {
              const completed =
                currentStep > step.number;

              const active =
                currentStep === step.number;

              return (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => {
                    if (step.number <= currentStep) {
                      onStepClick(step.number);
                    }
                  }}
                  className={`relative z-10 flex w-full items-center gap-5 text-left ${
                    step.number <= currentStep
                      ? "cursor-pointer"
                      : "cursor-default"
                  }`}
                >
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-[18px] font-semibold transition ${
                      completed || active
                        ? "bg-[#0db77a] text-white shadow-[0_4px_12px_rgba(13,183,122,0.2)]"
                        : "bg-[#dce5ea] text-[#53647f]"
                    }`}
                  >
                    {completed ? (
                      <Check className="h-6 w-6" />
                    ) : (
                      step.number
                    )}
                  </span>

                  <span
                    className={`text-[18px] ${
                      active
                        ? "font-bold text-[#101827]"
                        : completed
                        ? "font-semibold text-[#52647f]"
                        : "font-medium text-[#61728f]"
                    }`}
                  >
                    {step.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative z-10 mt-10 rounded-[14px] bg-white/75 p-5 shadow-sm backdrop-blur">
          {currentStep === 1 && (
            <>
              <div className="mb-2 text-[34px] leading-none text-[#0db77a]">
                “
              </div>

              <p className="font-serif text-[17px] italic leading-6 text-[#27344b]">
                Great events are built by great organizers.
              </p>

              <p className="mt-4 text-[13px] font-semibold text-[#46546b]">
                — Team Zordr
              </p>
            </>
          )}

          {currentStep === 2 && (
            <SidebarMessage
              icon={<MapPin className="h-6 w-6" />}
              title="You’re almost there!"
              text="Just a few more details to set up your organizer account."
            />
          )}

          {currentStep === 3 && (
            <SidebarMessage
              icon={<ShieldCheck className="h-6 w-6" />}
              title="Secure & Safe"
              text="Your bank details are encrypted and stored securely."
            />
          )}

          {currentStep === 4 && (
            <SidebarMessage
              icon={<FileCheck2 className="h-6 w-6" />}
              title="Almost complete!"
              text="Upload the required documents and continue."
            />
          )}

          {currentStep === 5 && (
            <SidebarMessage
              icon={<ShieldCheck className="h-6 w-6" />}
              title="You&apos;re almost done!"
              text="Review your details and submit your application to complete the setup."
            />
          )}
        </div>

        <div className="pointer-events-none absolute -bottom-1 left-0 right-0 h-[330px] overflow-hidden opacity-90">
          <div className="absolute bottom-0 left-0 h-[230px] w-full bg-[radial-gradient(ellipse_at_bottom,#143e40_0%,#17353b_40%,transparent_72%)]" />

          <div className="absolute bottom-0 left-0 right-0 h-[150px] bg-[linear-gradient(to_top,rgba(4,24,32,0.92),transparent)]" />

          <div className="absolute bottom-0 left-[48px] h-[130px] w-[6px] rounded-full bg-[#102b32]" />
          <div className="absolute bottom-[118px] left-[45px] h-[8px] w-[210px] rotate-[-4deg] rounded-full bg-[#102b32]" />

          <div className="absolute bottom-0 left-[80px] h-[90px] w-[25px] rounded-t-full bg-[#183d43]" />
          <div className="absolute bottom-0 left-[145px] h-[110px] w-[35px] rounded-t-full bg-[#15383f]" />
          <div className="absolute bottom-0 right-[65px] h-[105px] w-[28px] rounded-t-full bg-[#15383f]" />

          <div className="absolute bottom-[35px] left-[52px] h-[4px] w-[36px] rounded-full bg-[#0db77a]" />
        </div>
      </div>
    </aside>
  );
}

function SidebarMessage({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-3 text-[#0db77a]">
        {icon}

        <span className="text-[16px] font-bold text-[#111827]">
          {title}
        </span>
      </div>

      <p className="text-[14px] leading-6 text-[#53647f]">
        {text}
      </p>
    </div>
  );
}

/* =========================================================
   TOP HELP
========================================================= */

function TopHelp() {
  return (
    <div className="flex justify-end px-6 pt-5 md:px-10 lg:px-12">
      <div className="flex items-center gap-3 text-[13px] text-[#52627c]">
        <span>Need help?</span>

        <button
          type="button"
          className="inline-flex items-center gap-1 font-semibold text-[#08a970] underline underline-offset-2"
        >
          Contact Support
          <ExternalLink className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   COMMON PAGE HEADER
========================================================= */

function PageHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="mb-8">
      <p className="mb-2 text-[14px] font-bold uppercase tracking-[0.2px] text-[#06a96f]">
        ORGANIZER ONBOARDING
      </p>

      <h1 className="text-[34px] font-bold leading-tight tracking-[-1px] text-[#0e1523] md:text-[38px]">
        {title}
      </h1>

      <p className="mt-2 text-[18px] leading-7 text-[#61718d]">
        {description}
      </p>
    </div>
  );
}

/* =========================================================
   STEP 1
========================================================= */

function StepOne({
  organizationName,
  setOrganizationName,
  organizationType,
  setOrganizationType,
  contactName,
  setContactName,
  mobile,
  setMobile,
  email,
  setEmail,
  alternateContact,
  setAlternateContact,
  address,
  setAddress,
  city,
  setCity,
  state,
  setState,
  pincode,
  setPincode,
  logoUploaded,
  logoFile,
  onLogoUpload,
  onCancel,
  onNext,
}: {
  organizationName: string;
  setOrganizationName: (v: string) => void;
  organizationType: string;
  setOrganizationType: (v: string) => void;
  contactName: string;
  setContactName: (v: string) => void;
  mobile: string;
  setMobile: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  alternateContact: string;
  setAlternateContact: (v: string) => void;
  address: string;
  setAddress: (v: string) => void;
  city: string;
  setCity: (v: string) => void;
  state: string;
  setState: (v: string) => void;
  pincode: string;
  setPincode: (v: string) => void;
  logoUploaded: boolean;
  logoFile: UploadedFile | null;
  onLogoUpload: (file: File) => void;
  onCancel: () => void;
  onNext: () => void;
}) {
  return (
    <>
      <PageHeader
        title="Tell us about your organization"
        description="This information will be used to set up your organizer account."
      />

      <SectionHeading
        title="Organization Information"
        description="Basic details about your organization or event group."
      />

      <div className="grid gap-5 md:grid-cols-2">
        <Field
          label="Organization / Group Name"
          required
          value={organizationName}
          onChange={setOrganizationName}
          helper="Enter the official name of your organization, club or group."
        />

        <SelectField
          label="Organization Type"
          required
          value={organizationType}
          options={[
            "College Club / Student Body",
            "Educational Institution",
            "Event Company",
            "Community Group",
            "Other",
          ]}
          onChange={setOrganizationType}
        />
      </div>

      <div className="mt-6">
        <label className="mb-2 block text-[15px] font-medium text-[#101827]">
          Organization Logo <span className="text-red-500">*</span>
        </label>

        <div className="flex flex-col gap-4 md:flex-row">
          <label
            htmlFor="organization-logo-upload"
            className="flex min-h-[110px] flex-1 cursor-pointer items-center justify-center gap-4 rounded-lg border border-dashed border-[#cbd7df] bg-white px-6 transition hover:border-[#0db77a] hover:bg-[#f8fcfa]"
          >
            <ImageIcon className="h-7 w-7 text-[#5a6b83]" />

            <div className="text-left">
              <p className="text-[14px] font-medium text-[#43516a]">
                Click to upload or drag and drop
              </p>

              <p className="mt-1 text-[13px] text-[#70809a]">
                PNG, JPG up to 2MB (recommended 500×500)
              </p>
            </div>
          </label>

          <input
            id="organization-logo-upload"
            type="file"
            accept="image/png,image/jpeg,image/jpg"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) onLogoUpload(file);
              event.currentTarget.value = "";
            }}
          />

          {logoUploaded && logoFile && (
            <div className="flex h-[110px] w-[125px] items-center justify-center overflow-hidden rounded-lg border border-[#d7e0e5] bg-black">
              <img
                src={logoFile.url}
                alt="Uploaded organization logo"
                className="h-full w-full object-contain"
              />
            </div>
          )}
        </div>
      </div>

      <div className="mt-10">
        <SectionHeading
          title="Organizer Contact Person"
          description="Primary point of contact for all communications."
        />

        <div className="grid gap-5 md:grid-cols-2">
          <Field
            label="Your Full Name"
            required
            value={contactName}
            onChange={setContactName}
          />

          <PhoneField
            label="Mobile Number"
            required
            value={mobile}
            onChange={setMobile}
          />

          <Field
            label="Email Address"
            required
            value={email}
            onChange={setEmail}
          />

          <PhoneField
            label="Alternate Contact"
            value={alternateContact}
            placeholder="Enter alternate number"
            onChange={setAlternateContact}
          />
        </div>
      </div>

      <div className="mt-10">
        <SectionHeading
          title="Address"
          description="Official address of your organization."
        />

        <Field
          label="Address"
          required
          value={address}
          onChange={setAddress}
        />

        <div className="mt-5 grid gap-5 md:grid-cols-[1fr_1fr_205px]">
          <Field
            label="City"
            required
            value={city}
            onChange={setCity}
          />

          <SelectField
            label="State"
            required
            value={state}
            options={[
              "Telangana",
              "Andhra Pradesh",
              "Karnataka",
              "Tamil Nadu",
              "Maharashtra",
            ]}
            onChange={setState}
          />

          <Field
            label="Pincode"
            required
            value={pincode}
            onChange={setPincode}
          />
        </div>
      </div>

      <div className="mt-9 flex items-center justify-between border-t border-[#e5eaed] pt-5">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg border border-[#d7e0e7] bg-white px-7 py-3 text-[14px] font-semibold text-[#5c687b] transition hover:bg-[#f8fafb]"
        >
          Cancel
        </button>

        <PrimaryButton onClick={onNext}>
          Save &amp; Continue
          <ArrowRight className="h-4 w-4" />
        </PrimaryButton>
      </div>
    </>
  );
}

/* =========================================================
   STEP 2
========================================================= */

function StepTwo({
  officialEmail,
  setOfficialEmail,
  publicContact,
  setPublicContact,
  website,
  setWebsite,
  instagram,
  setInstagram,
  fullAddress,
  setFullAddress,
  city,
  setCity,
  state,
  setState,
  pincode,
  setPincode,
  mapsLink,
  setMapsLink,
  onPrevious,
  onNext,
}: {
  officialEmail: string;
  setOfficialEmail: (v: string) => void;
  publicContact: string;
  setPublicContact: (v: string) => void;
  website: string;
  setWebsite: (v: string) => void;
  instagram: string;
  setInstagram: (v: string) => void;
  fullAddress: string;
  setFullAddress: (v: string) => void;
  city: string;
  setCity: (v: string) => void;
  state: string;
  setState: (v: string) => void;
  pincode: string;
  setPincode: (v: string) => void;
  mapsLink: string;
  setMapsLink: (v: string) => void;
  onPrevious: () => void;
  onNext: () => void;
}) {
  return (
    <>
      <PageHeader
        title="Contact & Address"
        description="Help attendees and partners reach you easily."
      />

      <InfoBanner>
        <Info className="h-5 w-5 shrink-0 text-[#0db77a]" />

        <div>
          <p className="font-semibold text-[#1c2b3e]">
            This information will be publicly visible on your event pages.
          </p>

          <p className="mt-0.5 text-[13px] text-[#667791]">
            You can update these details anytime from settings.
          </p>
        </div>
      </InfoBanner>

      <SectionHeading
        title="Contact Information"
        description="These details will be used for official communication."
      />

      <div className="grid gap-5 md:grid-cols-2">
        <FieldWithIcon
          icon={<Mail className="h-5 w-5" />}
          label="Official Email Address"
          required
          value={officialEmail}
          onChange={setOfficialEmail}
          helper="We'll use this for important updates."
        />

        <PhoneField
          label="Public Contact Number"
          required
          value={publicContact}
          onChange={setPublicContact}
          helper="This will be visible to attendees."
        />

        <FieldWithIcon
          icon={<LinkIcon className="h-5 w-5" />}
          label="Website"
          placeholder="https://www.yourclub.in"
          value={website}
          onChange={setWebsite}
          helper="Link to your official website or social media."
        />

        <FieldWithIcon
          icon={<Camera className="h-5 w-5" />}
          label="Instagram"
          placeholder="@yourclub"
          value={instagram}
          onChange={setInstagram}
          helper="Your Instagram handle (e.g., @yourclub)."
        />
      </div>

      <div className="mt-10">
        <SectionHeading
          title="Address Information"
          description="This will be shown to attendees and used for official communication."
        />

        <TextAreaField
          icon={<MapPin className="h-5 w-5" />}
          label="Full Address"
          required
          value={fullAddress}
          onChange={setFullAddress}
          helper="Enter your complete address."
        />

        <div className="mt-5 grid gap-5 md:grid-cols-3">
          <FieldWithIcon
            icon={<Building2 className="h-5 w-5" />}
            label="City"
            required
            value={city}
            onChange={setCity}
          />

          <SelectField
            label="State"
            required
            value={state}
            options={[
              "Telangana",
              "Andhra Pradesh",
              "Karnataka",
              "Tamil Nadu",
              "Maharashtra",
            ]}
            onChange={setState}
            icon={<Landmark className="h-5 w-5" />}
          />

          <FieldWithIcon
            icon={<MapPin className="h-5 w-5" />}
            label="Pincode"
            required
            value={pincode}
            onChange={setPincode}
          />
        </div>

        <div className="mt-5">
          <FieldWithIcon
            icon={<LinkIcon className="h-5 w-5" />}
            label="Google Maps Link"
            value={mapsLink}
            onChange={setMapsLink}
            helper="Share your location on Google Maps for easy navigation."
          />
        </div>
      </div>

      <BottomActions
        onPrevious={onPrevious}
        onNext={onNext}
      />
    </>
  );
}

/* =========================================================
   STEP 3
========================================================= */

function StepThree({
  accountHolder,
  setAccountHolder,
  accountNumber,
  setAccountNumber,
  confirmAccountNumber,
  setConfirmAccountNumber,
  ifsc,
  setIfsc,
  bankName,
  setBankName,
  branchName,
  setBranchName,
  upiId,
  setUpiId,
  onPrevious,
  onNext,
}: {
  accountHolder: string;
  setAccountHolder: (v: string) => void;
  accountNumber: string;
  setAccountNumber: (v: string) => void;
  confirmAccountNumber: string;
  setConfirmAccountNumber: (v: string) => void;
  ifsc: string;
  setIfsc: (v: string) => void;
  bankName: string;
  setBankName: (v: string) => void;
  branchName: string;
  setBranchName: (v: string) => void;
  upiId: string;
  setUpiId: (v: string) => void;
  onPrevious: () => void;
  onNext: () => void;
}) {
  return (
    <>
      <PageHeader
        title="Payout Details"
        description="Add your bank account details to receive event payouts."
      />

      <InfoBanner green>
        <Info className="h-5 w-5 shrink-0 text-[#0db77a]" />

        <p className="text-[14px] leading-6 text-[#26354a]">
          <strong>We charge 0% platform fee.</strong> You will
          receive the full amount from ticket sales (excluding
          payment gateway charges) directly to your bank account
          after the settlement period.
        </p>
      </InfoBanner>

      <SectionHeading
        title="Bank Account Details"
        description="Payouts will be credited to this bank account."
      />

      <div className="grid gap-5 md:grid-cols-2">
        <FieldWithIcon
          icon={<User className="h-5 w-5" />}
          label="Account Holder Name"
          required
          value={accountHolder}
          onChange={setAccountHolder}
          helper="Name as per bank records."
        />

        <FieldWithIcon
          icon={<WalletCards className="h-5 w-5" />}
          label="Account Number"
          required
          value={accountNumber}
          onChange={setAccountNumber}
          helper="Enter your bank account number."
        />

        <FieldWithIcon
          icon={<WalletCards className="h-5 w-5" />}
          label="Confirm Account Number"
          required
          value={confirmAccountNumber}
          onChange={setConfirmAccountNumber}
          helper="Re-enter your bank account number."
        />

        <FieldWithIcon
          icon={<Landmark className="h-5 w-5" />}
          label="IFSC Code"
          required
          value={ifsc}
          onChange={setIfsc}
          helper="Enter 11-character IFSC code."
          valid
        />

        <FieldWithIcon
          icon={<Banknote className="h-5 w-5" />}
          label="Bank Name"
          value={bankName}
          onChange={setBankName}
          disabled
        />

        <FieldWithIcon
          icon={<MapPin className="h-5 w-5" />}
          label="Branch Name"
          value={branchName}
          onChange={setBranchName}
        />
      </div>

      <div className="mt-8">
        <SectionHeading
          title="UPI Details (Optional)"
          description="Add your UPI ID for faster verification and small payouts."
        />

        <div className="max-w-[52%]">
          <FieldWithIcon
            icon={<Banknote className="h-5 w-5" />}
            label="UPI ID"
            value={upiId}
            onChange={setUpiId}
            helper="Enter your UPI ID (e.g., name@okaxis, name@okhdfcbank)."
          />
        </div>
      </div>

      <div className="mt-8 rounded-lg border border-[#dce5ed] bg-[#f3f7fb] p-5">
        <div className="flex gap-3">
          <div className="mt-0.5">
            <CheckCircle2 className="h-6 w-6 text-[#1976ed]" />
          </div>

          <div>
            <h3 className="text-[16px] font-bold text-[#182538]">
              Settlement Information
            </h3>

            <ul className="mt-2 list-disc space-y-1 pl-5 text-[14px] leading-5 text-[#53647f]">
              <li>
                Payouts are usually processed within 3–5
                business days after the event.
              </li>
              <li>
                You&apos;ll be notified via email and WhatsApp
                once the payout is initiated.
              </li>
              <li>
                For any issues, contact our support team.
              </li>
            </ul>
          </div>
        </div>
      </div>

      <BottomActions
        onPrevious={onPrevious}
        onNext={onNext}
      />
    </>
  );
}

/* =========================================================
   STEP 4
========================================================= */

function StepFour({
  panUploaded,
  gstUploaded,
  registrationUploaded,
  otherDocumentUploaded,
  onUpload,
  onView,
  onPrevious,
  onNext,
}: {
  panUploaded: boolean;
  gstUploaded: boolean;
  registrationUploaded: boolean;
  otherDocumentUploaded: boolean;
  onUpload: (key: string, file: File) => void;
  onView: (key: string) => void;
  onPrevious: () => void;
  onNext: () => void;
}) {
  return (
    <>
      <PageHeader
        title="Documents"
        description="Upload supporting documents to verify your organizer account."
      />

      <InfoBanner>
        <Info className="h-5 w-5 shrink-0 text-[#0db77a]" />

        <div>
          <p className="font-semibold text-[#1c2b3e]">
            Documents help us verify your organization.
          </p>

          <p className="mt-0.5 text-[13px] text-[#667791]">
            Upload clear PDF, PNG or JPG files. Maximum file
            size is 5MB per document.
          </p>
        </div>
      </InfoBanner>

      <SectionHeading
        title="Organization Documents"
        description="Upload the documents applicable to your organization."
      />

      <div className="space-y-4">
        <DocumentUpload
          title="PAN Card"
          description="PAN card of the organization or authorized representative."
          required
          uploaded={panUploaded}
          file={onboardingFileStore.documents.pan}
          inputId="document-pan-upload"
          onUpload={(file) => onUpload("pan", file)}
          onView={() => onView("pan")}
        />

        <DocumentUpload
          title="GST Certificate"
          description="GST registration certificate, if applicable."
          uploaded={gstUploaded}
          file={onboardingFileStore.documents.gst}
          inputId="document-gst-upload"
          onUpload={(file) => onUpload("gst", file)}
          onView={() => onView("gst")}
        />

        <DocumentUpload
          title="Organization Registration"
          description="Certificate or document proving organization registration."
          uploaded={registrationUploaded}
          file={onboardingFileStore.documents.registration}
          inputId="document-registration-upload"
          onUpload={(file) => onUpload("registration", file)}
          onView={() => onView("registration")}
        />

        <DocumentUpload
          title="Other Document"
          description="Any other supporting document, if applicable."
          uploaded={otherDocumentUploaded}
          file={onboardingFileStore.documents.other}
          inputId="document-other-upload"
          onUpload={(file) => onUpload("other", file)}
          onView={() => onView("other")}
        />
      </div>

      <div className="mt-8 rounded-lg border border-[#e0e7eb] bg-[#f8fafb] p-5">
        <div className="flex gap-3">
          <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-[#0db77a]" />

          <div>
            <p className="font-semibold text-[#172336]">
              Your documents are secure
            </p>

            <p className="mt-1 text-[13px] leading-5 text-[#65758e]">
              Documents are securely stored and only used for
              organizer verification purposes.
            </p>
          </div>
        </div>
      </div>

      <BottomActions
        onPrevious={onPrevious}
        onNext={onNext}
      />
    </>
  );
}

/* =========================================================
   STEP 5
========================================================= */

function StepFive({
  organizationName,
  organizationType,
  contactName,
  email,
  mobile,
  address,
  city,
  state,
  pincode,
  accountHolder,
  accountNumber,
  ifsc,
  bankName,
  branchName,
  upiId,
  panUploaded,
  gstUploaded,
  registrationUploaded,
  otherDocumentUploaded,
  onViewDocument,
  submitted,
  onPrevious,
  onSubmit,
  onEdit,
}: {
  organizationName: string;
  organizationType: string;
  contactName: string;
  email: string;
  mobile: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  accountHolder: string;
  accountNumber: string;
  ifsc: string;
  bankName: string;
  branchName: string;
  upiId: string;
  panUploaded: boolean;
  gstUploaded: boolean;
  registrationUploaded: boolean;
  otherDocumentUploaded: boolean;
  onViewDocument: (key: string) => void;
  submitted: boolean;
  onPrevious: () => void;
  onSubmit: () => void;
  onEdit: (step: number) => void;
}) {
  return (
    <>
      <PageHeader
        title="Review & Submit"
        description="Please review your information before submitting. You can go back and edit any section if needed."
      />

      <div className="grid gap-5 xl:grid-cols-2">
        <ReviewCard
          icon={<Building2 className="h-5 w-5" />}
          title="Organization Details"
          onEdit={() => onEdit(1)}
        >
          <ReviewRow
            label="Organization Name"
            value={organizationName}
          />

          <ReviewRow
            label="Organization Type"
            value={organizationType}
          />

          <div className="mt-3 flex items-start gap-6 text-[14px]">
            <span className="w-[155px] shrink-0 text-[#65748d]">
              Logo
            </span>

            <div className="flex h-[76px] w-[76px] items-center justify-center rounded-lg bg-black text-center">
              <div>
                <div className="text-2xl">🔥</div>
                <div className="text-[8px] font-bold text-white">
                  KITSW
                </div>
              </div>
            </div>
          </div>
        </ReviewCard>

        <ReviewCard
          icon={<User className="h-5 w-5" />}
          title="Contact & Address"
          onEdit={() => onEdit(2)}
        >
          <ReviewRow
            label="Contact Person"
            value={contactName}
          />

          <ReviewRow
            label="Email"
            value={email}
          />

          <ReviewRow
            label="Phone"
            value={`+91 ${mobile}`}
          />

          <ReviewRow
            label="Address"
            value={`${address}, ${city}, ${state} ${pincode}`}
          />

          <ReviewRow
            label="Website"
            value="https://www.kitsw.in"
          />

          <ReviewRow
            label="Instagram"
            value="@kitsw_cultural"
          />
        </ReviewCard>

        <ReviewCard
          icon={<Landmark className="h-5 w-5" />}
          title="Payout Details"
          onEdit={() => onEdit(3)}
        >
          <ReviewRow
            label="Account Holder"
            value={accountHolder}
          />

          <ReviewRow
            label="Account Number"
            value={accountNumber}
          />

          <ReviewRow
            label="IFSC Code"
            value={ifsc}
          />

          <ReviewRow
            label="Bank Name"
            value={bankName}
          />

          <ReviewRow
            label="Branch"
            value={branchName}
          />

          <ReviewRow
            label="UPI ID"
            value={upiId}
          />
        </ReviewCard>

        <ReviewCard
          icon={<FileText className="h-5 w-5" />}
          title="Documents (Optional)"
          onEdit={() => onEdit(4)}
        >
          <DocumentReviewRow
            label="PAN Card"
            uploaded={panUploaded}
            onView={() => onViewDocument("pan")}
          />

          <DocumentReviewRow
            label="GST Certificate"
            uploaded={gstUploaded}
            onView={() => onViewDocument("gst")}
          />

          <DocumentReviewRow
            label="Org. Registration"
            uploaded={registrationUploaded}
            onView={() => onViewDocument("registration")}
          />

          <DocumentReviewRow
            label="Other Document"
            uploaded={otherDocumentUploaded}
            onView={() => onViewDocument("other")}
          />
        </ReviewCard>
      </div>

      <div className="mt-5 rounded-xl border border-[#d7eee4] bg-[#effaf5] p-5">
        <div className="flex gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0db77a] text-white">
            <Check className="h-5 w-5" />
          </div>

          <div>
            <h3 className="font-bold text-[#162437]">
              Looks Good!
            </h3>

            <p className="mt-1 text-[14px] leading-6 text-[#50627c]">
              By submitting, you agree to our{" "}
              <button
                type="button"
                className="font-semibold text-[#0aa970] underline"
              >
                Terms of Service
              </button>{" "}
              and{" "}
              <button
                type="button"
                className="font-semibold text-[#0aa970] underline"
              >
                Privacy Policy
              </button>
              . We will review your application and notify you
              via email and WhatsApp within 1–2 business days.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-[#dce7f3] bg-[#f1f6fc] p-5">
        <div className="flex gap-3">
          <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#1976ed]" />

          <div>
            <h3 className="font-bold text-[#172438]">
              What happens next?
            </h3>

            <div className="mt-2 space-y-1.5 text-[14px] text-[#566983]">
              <div className="flex gap-3">
                <span className="font-bold text-[#172438]">
                  1
                </span>
                <span>
                  Our team will review your application and
                  documents.
                </span>
              </div>

              <div className="flex gap-3">
                <span className="font-bold text-[#172438]">
                  2
                </span>
                <span>
                  You&apos;ll receive an email and WhatsApp
                  notification once approved.
                </span>
              </div>

              <div className="flex gap-3">
                <span className="font-bold text-[#172438]">
                  3
                </span>
                <span>
                  After approval, you can start creating and
                  publishing events.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-[#e5eaed] pt-5">
        <button
          type="button"
          onClick={onPrevious}
          disabled={submitted}
          className="inline-flex items-center gap-2 rounded-lg border border-[#d7e0e7] bg-white px-7 py-3 text-[14px] font-semibold text-[#253249] transition hover:bg-[#f8fafb] disabled:opacity-50"
        >
          <ArrowLeft className="h-4 w-4" />
          Previous
        </button>

        <PrimaryButton
          onClick={onSubmit}
          disabled={submitted}
        >
          {submitted
            ? "Submitting..."
            : "Submit Application"}
          <ArrowRight className="h-4 w-4" />
        </PrimaryButton>
      </div>
    </>
  );
}

/* =========================================================
   COMMON COMPONENTS
========================================================= */

function SectionHeading({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-5 flex items-start gap-4">
      <div className="min-w-fit">
        <h2 className="text-[19px] font-bold text-[#101827]">
          {title}
        </h2>

        {description && (
          <p className="mt-0.5 text-[14px] text-[#65758f]">
            {description}
          </p>
        )}
      </div>

      <div className="mt-3 h-px flex-1 bg-[#dfe6ea]" />
    </div>
  );
}

function Field({
  label,
  required,
  value,
  onChange,
  placeholder,
  helper,
  disabled,
}: {
  label: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  helper?: string;
  disabled?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-[14px] font-medium text-[#121b2a]">
        {label}

        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`h-[43px] w-full rounded-lg border border-[#d6e0e7] bg-white px-3 text-[14px] text-[#182438] outline-none transition placeholder:text-[#8a98ac] focus:border-[#0db77a] focus:ring-2 focus:ring-[#0db77a]/10 ${
          disabled
            ? "cursor-not-allowed bg-[#f2f5f8] text-[#6c7890]"
            : ""
        }`}
      />

      {helper && (
        <p className="mt-1.5 text-[12px] text-[#73829b]">
          {helper}
        </p>
      )}
    </div>
  );
}

function FieldWithIcon({
  icon,
  label,
  required,
  value,
  onChange,
  placeholder,
  helper,
  disabled,
  valid,
}: {
  icon: React.ReactNode;
  label: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  helper?: string;
  disabled?: boolean;
  valid?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-[14px] font-medium text-[#121b2a]">
        {label}

        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      <div
        className={`flex h-[43px] items-center overflow-hidden rounded-lg border border-[#d6e0e7] bg-white focus-within:border-[#0db77a] focus-within:ring-2 focus-within:ring-[#0db77a]/10 ${
          disabled ? "bg-[#f2f5f8]" : ""
        }`}
      >
        <div className="flex h-full w-12 shrink-0 items-center justify-center border-r border-[#e4e9ed] text-[#687891]">
          {icon}
        </div>

        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="h-full min-w-0 flex-1 bg-transparent px-3 text-[14px] text-[#182438] outline-none placeholder:text-[#8a98ac]"
        />

        {valid && (
          <Check className="mr-3 h-5 w-5 text-[#0db77a]" />
        )}
      </div>

      {helper && (
        <p className="mt-1.5 text-[12px] text-[#73829b]">
          {helper}
        </p>
      )}
    </div>
  );
}

function TextAreaField({
  icon,
  label,
  required,
  value,
  onChange,
  helper,
}: {
  icon: React.ReactNode;
  label: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  helper?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-[14px] font-medium text-[#121b2a]">
        {label}

        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      <div className="flex overflow-hidden rounded-lg border border-[#d6e0e7] bg-white focus-within:border-[#0db77a] focus-within:ring-2 focus-within:ring-[#0db77a]/10">
        <div className="flex w-12 shrink-0 justify-center pt-4 text-[#687891]">
          {icon}
        </div>

        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="min-h-[82px] flex-1 resize-none bg-transparent px-3 py-3 text-[14px] leading-6 text-[#182438] outline-none"
        />
      </div>

      {helper && (
        <p className="mt-1.5 text-[12px] text-[#73829b]">
          {helper}
        </p>
      )}
    </div>
  );
}

function SelectField({
  label,
  required,
  value,
  options,
  onChange,
  icon,
}: {
  label: string;
  required?: boolean;
  value: string;
  options: string[];
  onChange: (v: string) => void;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-[14px] font-medium text-[#121b2a]">
        {label}

        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#687891]">
            {icon}
          </div>
        )}

        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`h-[43px] w-full appearance-none rounded-lg border border-[#d6e0e7] bg-white pr-10 text-[14px] text-[#182438] outline-none transition focus:border-[#0db77a] focus:ring-2 focus:ring-[#0db77a]/10 ${
            icon ? "pl-11" : "pl-3"
          }`}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#687891]" />
      </div>
    </div>
  );
}

function PhoneField({
  label,
  required,
  value,
  onChange,
  placeholder,
  helper,
}: {
  label: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  helper?: string;
}) {
  const [countryCode, setCountryCode] = useState("+91");

  const countryCodes = [
    { code: "+91", country: "India", flag: "🇮🇳" },
    { code: "+1", country: "USA / Canada", flag: "🇺🇸" },
    { code: "+44", country: "UK", flag: "🇬🇧" },
    { code: "+61", country: "Australia", flag: "🇦🇺" },
    { code: "+971", country: "UAE", flag: "🇦🇪" },
  ];

  return (
    <div>
      <label className="mb-2 block text-[14px] font-medium text-[#121b2a]">
        {label}

        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      <div className="flex h-[43px] overflow-hidden rounded-lg border border-[#d6e0e7] bg-white focus-within:border-[#0db77a] focus-within:ring-2 focus-within:ring-[#0db77a]/10">
        <div className="relative h-full shrink-0 border-r border-[#e4e9ed]">
          <select
            value={countryCode}
            onChange={(event) => setCountryCode(event.target.value)}
            aria-label={`${label} country code`}
            className="h-full w-[112px] cursor-pointer appearance-none bg-transparent pl-3 pr-7 text-[13px] text-[#27344a] outline-none"
          >
            {countryCodes.map((country) => (
              <option key={country.code} value={country.code}>
                {country.flag} {country.code} {country.country}
              </option>
            ))}
          </select>

          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#697891]" />
        </div>

        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="min-w-0 flex-1 px-3 text-[14px] text-[#182438] outline-none placeholder:text-[#8a98ac]"
        />
      </div>

      {helper && (
        <p className="mt-1.5 text-[12px] text-[#73829b]">
          {helper}
        </p>
      )}
    </div>
  );
}

function InfoBanner({
  children,
  green = false,
}: {
  children: React.ReactNode;
  green?: boolean;
}) {
  return (
    <div
      className={`mb-8 flex items-start gap-3 rounded-lg border p-4 ${
        green
          ? "border-[#d8eee6] bg-[#eefaf5]"
          : "border-[#e0e7ec] bg-[#f6f8fa]"
      }`}
    >
      {children}
    </div>
  );
}

function PrimaryButton({
  children,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#08ad73] px-7 py-3 text-[14px] font-semibold text-white shadow-[0_4px_12px_rgba(8,173,115,0.18)] transition hover:bg-[#079d69] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {children}
    </button>
  );
}

function BottomActions({
  onPrevious,
  onNext,
}: {
  onPrevious: () => void;
  onNext: () => void;
}) {
  return (
    <div className="mt-8 flex items-center justify-between border-t border-[#e5eaed] pt-5">
      <button
        type="button"
        onClick={onPrevious}
        className="inline-flex items-center gap-2 rounded-lg border border-[#d7e0e7] bg-white px-7 py-3 text-[14px] font-semibold text-[#253249] transition hover:bg-[#f8fafb]"
      >
        <ArrowLeft className="h-4 w-4" />
        Previous
      </button>

      <PrimaryButton onClick={onNext}>
        Save &amp; Continue
        <ArrowRight className="h-4 w-4" />
      </PrimaryButton>
    </div>
  );
}

/* =========================================================
   DOCUMENTS
========================================================= */

function DocumentUpload({
  title,
  description,
  required,
  uploaded,
  file,
  inputId,
  onUpload,
  onView,
}: {
  title: string;
  description: string;
  required?: boolean;
  uploaded: boolean;
  file: UploadedFile | null;
  inputId: string;
  onUpload: (file: File) => void;
  onView: () => void;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-[#dce4e9] bg-white p-5 md:flex-row md:items-center md:justify-between">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#edf7f3] text-[#0bad72]">
          <FileText className="h-5 w-5" />
        </div>

        <div>
          <h3 className="text-[15px] font-semibold text-[#172438]">
            {title}

            {required && (
              <span className="ml-1 text-red-500">*</span>
            )}
          </h3>

          <p className="mt-1 text-[13px] text-[#718099]">
            {description}
          </p>

          {file && (
            <p className="mt-1 max-w-[430px] truncate text-[12px] text-[#0aa970]" title={file.name}>
              {file.name}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3 md:shrink-0">
        {uploaded && file ? (
          <>
            <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#08a970]">
              <Check className="h-4 w-4" />
              Uploaded
            </span>

            <button
              type="button"
              onClick={onView}
              className="text-[13px] font-semibold text-[#1976ed] underline underline-offset-2"
            >
              View
            </button>

            <label
              htmlFor={inputId}
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[#cfdbe3] bg-white px-4 py-2.5 text-[13px] font-semibold text-[#34445d] transition hover:border-[#0db77a] hover:text-[#0db77a]"
            >
              <Upload className="h-4 w-4" />
              Replace
            </label>
          </>
        ) : (
          <label
            htmlFor={inputId}
            className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[#cfdbe3] bg-white px-4 py-2.5 text-[13px] font-semibold text-[#34445d] transition hover:border-[#0db77a] hover:text-[#0db77a]"
          >
            <Upload className="h-4 w-4" />
            Upload
          </label>
        )}

        <input
          id={inputId}
          type="file"
          accept="application/pdf,image/png,image/jpeg,image/jpg"
          className="hidden"
          onChange={(event) => {
            const selectedFile = event.target.files?.[0];
            if (selectedFile) onUpload(selectedFile);
            event.currentTarget.value = "";
          }}
        />
      </div>
    </div>
  );
}

/* =========================================================
   REVIEW
========================================================= */

function ReviewCard({
  icon,
  title,
  onEdit,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  onEdit: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-[#dce5ea] bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eaf4ff] text-[#1976ed]">
            {icon}
          </div>

          <h3 className="text-[16px] font-bold text-[#152237]">
            {title}
          </h3>
        </div>

        <button
          type="button"
          onClick={onEdit}
          className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#08a970] underline underline-offset-2"
        >
          Edit
        </button>
      </div>

      {children}
    </div>
  );
}

function ReviewRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="mb-2.5 flex gap-4 text-[14px] leading-5">
      <span className="w-[155px] shrink-0 text-[#687894]">
        {label}
      </span>

      <span className="min-w-0 text-[#1d2a3f]">
        {value}
      </span>
    </div>
  );
}

function DocumentReviewRow({
  label,
  uploaded,
  onView,
}: {
  label: string;
  uploaded: boolean;
  onView: () => void;
}) {
  return (
    <div className="mb-3 flex items-center justify-between gap-4 text-[14px]">
      <span className="text-[#667691]">
        {label}
      </span>

      {uploaded ? (
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 font-medium text-[#0aa970]">
            <Check className="h-4 w-4" />
            Uploaded
          </span>

          <button
            type="button"
            onClick={onView}
            className="text-[13px] font-semibold text-[#1976ed] underline underline-offset-2"
          >
            View
          </button>
        </div>
      ) : (
        <span className="text-[#64738b]">
          — Not uploaded
        </span>
      )}
    </div>
  );
}
