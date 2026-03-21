"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import {
  Car,
  User,
  Shield,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Send,
} from "lucide-react";

const STEPS = [
  { icon: Car, labelKey: "stepVehicle" },
  { icon: User, labelKey: "stepPersonal" },
  { icon: Shield, labelKey: "stepInsurance" },
  { icon: CheckCircle, labelKey: "stepSummary" },
];

const initialForm = {
  // Step 1 - Vehicle
  vehicleType: "",
  manufacturer: "",
  model: "",
  hsn: "",
  tsn: "",
  firstRegistration: "",
  mileage: "",
  usage: "",
  parkingType: "",
  licensePlate: "",
  // Step 2 - Personal
  firstName: "",
  lastName: "",
  birthDate: "",
  email: "",
  phone: "",
  street_address: "",
  zipCode: "",
  city: "",
  driverLicenseDate: "",
  additionalDrivers: "0",
  // Step 3 - Insurance
  coverageType: "",
  deductible: "",
  claimFreeYears: "",
  previousInsurance: "",
  startDate: "",
};

export default function CalculatorPage() {
  const t = useTranslations("calculator");
  const tc = useTranslations("common");

  const [currentStep, setCurrentStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "kfz_calculator", data: form }),
      });

      if (!res.ok) throw new Error();
      setSubmitted(true);
      toast.success(t("submitSuccess"));
    } catch {
      toast.error(tc("error"));
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <section className="gradient-bg text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <Car className="w-12 h-12 mx-auto mb-4 opacity-90" />
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              {t("title")}
            </h1>
          </div>
        </section>
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
          <div className="card">
            <div className="p-4 bg-green-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              {t("successTitle")}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {t("successText")}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="gradient-bg text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Car className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h1 className="text-3xl md:text-4xl font-bold mb-3">{t("title")}</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Progress Bar */}
        <div className="mb-10">
          <div className="flex items-center justify-between">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;

              return (
                <div key={index} className="flex-1 flex flex-col items-center relative">
                  {/* Connector line */}
                  {index > 0 && (
                    <div
                      className={`absolute top-5 right-1/2 w-full h-0.5 -z-0 ${
                        isCompleted ? "bg-primary-500" : "bg-gray-300"
                      }`}
                    />
                  )}
                  {/* Step circle */}
                  <div
                    className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isCompleted
                        ? "bg-primary-500 text-white"
                        : isActive
                        ? "bg-primary-500 text-white ring-4 ring-primary-200"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  {/* Label */}
                  <span
                    className={`mt-2 text-xs sm:text-sm font-medium text-center ${
                      isActive || isCompleted
                        ? "text-primary-600"
                        : "text-gray-400"
                    }`}
                  >
                    {t(step.labelKey)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Vehicle Data */}
          {currentStep === 0 && (
            <div className="card animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Car className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {t("vehicleData")}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Vehicle Type */}
                <div>
                  <label className="input-label">{t("vehicleType")}</label>
                  <select
                    name="vehicleType"
                    value={form.vehicleType}
                    onChange={handleChange}
                    required
                    className="input-field"
                  >
                    <option value="">---</option>
                    <option value="car">{t("vehicleTypeCar")}</option>
                    <option value="motorcycle">{t("vehicleTypeMotorcycle")}</option>
                    <option value="truck">{t("vehicleTypeTruck")}</option>
                    <option value="camper">{t("vehicleTypeCamper")}</option>
                    <option value="trailer">{t("vehicleTypeTrailer")}</option>
                  </select>
                </div>

                {/* Manufacturer */}
                <div>
                  <label className="input-label">{t("manufacturer")}</label>
                  <input
                    type="text"
                    name="manufacturer"
                    value={form.manufacturer}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder={t("manufacturerPlaceholder")}
                  />
                </div>

                {/* Model */}
                <div>
                  <label className="input-label">{t("model")}</label>
                  <input
                    type="text"
                    name="model"
                    value={form.model}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder={t("modelPlaceholder")}
                  />
                </div>

                {/* HSN */}
                <div>
                  <label className="input-label">{t("hsn")}</label>
                  <input
                    type="text"
                    name="hsn"
                    value={form.hsn}
                    onChange={handleChange}
                    className="input-field"
                    placeholder={t("hsnPlaceholder")}
                  />
                </div>

                {/* TSN */}
                <div>
                  <label className="input-label">{t("tsn")}</label>
                  <input
                    type="text"
                    name="tsn"
                    value={form.tsn}
                    onChange={handleChange}
                    className="input-field"
                    placeholder={t("tsnPlaceholder")}
                  />
                </div>

                {/* First Registration */}
                <div>
                  <label className="input-label">{t("firstRegistration")}</label>
                  <input
                    type="date"
                    name="firstRegistration"
                    value={form.firstRegistration}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                </div>

                {/* Mileage */}
                <div>
                  <label className="input-label">{t("mileage")}</label>
                  <select
                    name="mileage"
                    value={form.mileage}
                    onChange={handleChange}
                    required
                    className="input-field"
                  >
                    <option value="">---</option>
                    <option value="5000">{t("mileageUpTo")} 5.000 km</option>
                    <option value="10000">{t("mileageUpTo")} 10.000 km</option>
                    <option value="15000">{t("mileageUpTo")} 15.000 km</option>
                    <option value="20000">{t("mileageUpTo")} 20.000 km</option>
                    <option value="25000">25.000+ km</option>
                  </select>
                </div>

                {/* Usage */}
                <div>
                  <label className="input-label">{t("usage")}</label>
                  <select
                    name="usage"
                    value={form.usage}
                    onChange={handleChange}
                    required
                    className="input-field"
                  >
                    <option value="">---</option>
                    <option value="private">{t("usagePrivate")}</option>
                    <option value="commute">{t("usageCommute")}</option>
                    <option value="commercial">{t("usageCommercial")}</option>
                  </select>
                </div>

                {/* Parking Type */}
                <div>
                  <label className="input-label">{t("parkingType")}</label>
                  <select
                    name="parkingType"
                    value={form.parkingType}
                    onChange={handleChange}
                    required
                    className="input-field"
                  >
                    <option value="">---</option>
                    <option value="garage">{t("parkingGarage")}</option>
                    <option value="carport">{t("parkingCarport")}</option>
                    <option value="street">{t("parkingStreet")}</option>
                  </select>
                </div>

                {/* License Plate */}
                <div>
                  <label className="input-label">{t("licensePlate")}</label>
                  <input
                    type="text"
                    name="licensePlate"
                    value={form.licensePlate}
                    onChange={handleChange}
                    className="input-field"
                    placeholder={t("licensePlatePlaceholder")}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Personal Data */}
          {currentStep === 1 && (
            <div className="card animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-50 rounded-lg">
                  <User className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {t("personalData")}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Name */}
                <div>
                  <label className="input-label">{t("firstName")}</label>
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="input-label">{t("lastName")}</label>
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                </div>

                {/* Birth Date */}
                <div>
                  <label className="input-label">{t("birthDate")}</label>
                  <input
                    type="date"
                    name="birthDate"
                    value={form.birthDate}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="input-label">{tc("email")}</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="input-label">{tc("phone")}</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                </div>

                {/* Street Address */}
                <div>
                  <label className="input-label">{t("streetAddress")}</label>
                  <input
                    type="text"
                    name="street_address"
                    value={form.street_address}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                </div>

                {/* Zip Code */}
                <div>
                  <label className="input-label">{t("zipCode")}</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={form.zipCode}
                    onChange={handleChange}
                    required
                    className="input-field"
                    placeholder={t("zipCodePlaceholder")}
                  />
                </div>

                {/* City */}
                <div>
                  <label className="input-label">{t("city")}</label>
                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                </div>

                {/* Driver License Date */}
                <div>
                  <label className="input-label">{t("driverLicenseDate")}</label>
                  <input
                    type="date"
                    name="driverLicenseDate"
                    value={form.driverLicenseDate}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                </div>

                {/* Additional Drivers */}
                <div>
                  <label className="input-label">{t("additionalDrivers")}</label>
                  <select
                    name="additionalDrivers"
                    value={form.additionalDrivers}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Insurance Details */}
          {currentStep === 2 && (
            <div className="card animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <Shield className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {t("insuranceDetails")}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Coverage Type */}
                <div>
                  <label className="input-label">{t("coverageType")}</label>
                  <select
                    name="coverageType"
                    value={form.coverageType}
                    onChange={handleChange}
                    required
                    className="input-field"
                  >
                    <option value="">---</option>
                    <option value="liability">{t("coverageLiability")}</option>
                    <option value="partialCasco">{t("coveragePartialCasco")}</option>
                    <option value="fullCasco">{t("coverageFullCasco")}</option>
                  </select>
                </div>

                {/* Deductible */}
                <div>
                  <label className="input-label">{t("deductible")}</label>
                  <select
                    name="deductible"
                    value={form.deductible}
                    onChange={handleChange}
                    required
                    className="input-field"
                  >
                    <option value="">---</option>
                    <option value="0">0 &euro;</option>
                    <option value="150">150 &euro;</option>
                    <option value="300">300 &euro;</option>
                    <option value="500">500 &euro;</option>
                    <option value="1000">1.000 &euro;</option>
                  </select>
                </div>

                {/* Claim Free Years */}
                <div>
                  <label className="input-label">{t("claimFreeYears")}</label>
                  <select
                    name="claimFreeYears"
                    value={form.claimFreeYears}
                    onChange={handleChange}
                    required
                    className="input-field"
                  >
                    <option value="">---</option>
                    {Array.from({ length: 36 }, (_, i) => (
                      <option key={i} value={`SF${i}`}>
                        SF{i}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Previous Insurance */}
                <div>
                  <label className="input-label">{t("previousInsurance")}</label>
                  <input
                    type="text"
                    name="previousInsurance"
                    value={form.previousInsurance}
                    onChange={handleChange}
                    className="input-field"
                    placeholder={t("previousInsurancePlaceholder")}
                  />
                </div>

                {/* Start Date */}
                <div>
                  <label className="input-label">{t("startDate")}</label>
                  <input
                    type="date"
                    name="startDate"
                    value={form.startDate}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Summary */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fade-in">
              {/* Vehicle Summary */}
              <div className="card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Car className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {t("vehicleData")}
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <SummaryRow label={t("vehicleType")} value={form.vehicleType ? t(`vehicleType${capitalize(form.vehicleType)}`) : "-"} />
                  <SummaryRow label={t("manufacturer")} value={form.manufacturer} />
                  <SummaryRow label={t("model")} value={form.model} />
                  <SummaryRow label={t("hsn")} value={form.hsn} />
                  <SummaryRow label={t("tsn")} value={form.tsn} />
                  <SummaryRow label={t("firstRegistration")} value={form.firstRegistration} />
                  <SummaryRow label={t("mileage")} value={form.mileage ? `${Number(form.mileage).toLocaleString()} km` : "-"} />
                  <SummaryRow label={t("usage")} value={form.usage ? t(`usage${capitalize(form.usage)}`) : "-"} />
                  <SummaryRow label={t("parkingType")} value={form.parkingType ? t(`parking${capitalize(form.parkingType)}`) : "-"} />
                  <SummaryRow label={t("licensePlate")} value={form.licensePlate} />
                </div>
              </div>

              {/* Personal Summary */}
              <div className="card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <User className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {t("personalData")}
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <SummaryRow label={t("firstName")} value={form.firstName} />
                  <SummaryRow label={t("lastName")} value={form.lastName} />
                  <SummaryRow label={t("birthDate")} value={form.birthDate} />
                  <SummaryRow label={tc("email")} value={form.email} />
                  <SummaryRow label={tc("phone")} value={form.phone} />
                  <SummaryRow label={t("streetAddress")} value={form.street_address} />
                  <SummaryRow label={t("zipCode")} value={form.zipCode} />
                  <SummaryRow label={t("city")} value={form.city} />
                  <SummaryRow label={t("driverLicenseDate")} value={form.driverLicenseDate} />
                  <SummaryRow label={t("additionalDrivers")} value={form.additionalDrivers} />
                </div>
              </div>

              {/* Insurance Summary */}
              <div className="card">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <Shield className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {t("insuranceDetails")}
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <SummaryRow label={t("coverageType")} value={form.coverageType ? t(`coverage${capitalize(form.coverageType)}`) : "-"} />
                  <SummaryRow label={t("deductible")} value={form.deductible ? `${Number(form.deductible).toLocaleString()} \u20AC` : "-"} />
                  <SummaryRow label={t("claimFreeYears")} value={form.claimFreeYears} />
                  <SummaryRow label={t("previousInsurance")} value={form.previousInsurance} />
                  <SummaryRow label={t("startDate")} value={form.startDate} />
                </div>
              </div>

              {/* Note */}
              <div className="card border-l-4 border-primary-500">
                <p className="text-gray-600 text-sm leading-relaxed">
                  {t("summaryNote")}
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {currentStep > 0 ? (
              <button
                type="button"
                onClick={prevStep}
                className="btn-secondary flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                {tc("back")}
              </button>
            ) : (
              <div />
            )}

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="btn-primary flex items-center gap-2"
              >
                {tc("next")}
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
                className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                {loading ? tc("loading") : t("submitButton")}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

function capitalize(str: string): string {
  if (!str) return str;
  // Handle camelCase keys like "partialCasco" -> "PartialCasco"
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col py-1.5 border-b border-gray-100">
      <span className="text-gray-500 text-xs">{label}</span>
      <span className="text-gray-900 font-medium">{value || "-"}</span>
    </div>
  );
}
