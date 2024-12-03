// import React from "react";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Layout from "./components/Layout";
// import Dashboard from "./pages/Dashboard";
// import Billing from "./pages/Billing";
// import OPD from "./pages/OPD";
// import IPD from "./pages/IPD";
// import Pharmacy from "./pages/Pharmacy";
// import Pathology from "./pages/Pathology";
// import Radiology from "./pages/Radiology";
// import BloodBank from "./pages/BloodBank";
// import Ambulance from "./pages/Ambulance";
// import FrontOffice from "./pages/FrontOffice";
// import FrontCMS from "./pages/FrontCMS";
// import AppointmentDetails from "./pages/AppointmentDetails";
// import Login from "./adminLogin/Login";
// import PrivateRoute from "./components/PrivateRoute";
// import AppointmentPage from "./pages/AppointmentPage";
// import Setup from "./pages/Setup";
// import Settings from "./pages/Setup/Settings";
// import PatientList from "./pages/Setup/Patient/patient";
// import BedclassList from "./pages/Setup/bed/Bedclass";
// import BedList from "./pages/Setup/bed/Bed";
// import BedTypeList from "./pages/Setup/bed/bedtype";
// import BedGroupList from "./pages/Setup/bed/bedgroup";
// import FloorList from "./pages/Setup/bed/floar";
// import PrintHeaderFooter from "./pages/Setup/PrintHeaderFooter";
// import OperationCategoryList from "./pages/Setup/operations/Operations";
// import OperationList from "./pages/Setup/operations/operationsl";
// import PharmacyList from "./pages/Setup/pharmacy/PharmacySetup";
// import SupplierList from "./pages/Setup/pharmacy/supplier";
// import MedicineDosageList from "./pages/Setup/pharmacy/medicinedosagelist";
// import DosageIntervalList from "./pages/Setup/pharmacy/dosageintervallist";
// import DosageDurationList from "./pages/Setup/pharmacy/dragduration";
// import PathologySetup from "./pages/Setup/Pathology/PathologySetup";
// import UnitList from "./pages/Setup/Pathology/unit";
// import PathologyParameterList from "./pages/Setup/Pathology/pathologyparameter";
// import RadiologyCategoryList from "./pages/Setup/Radiology/Radilogylist";
// import UnitListl from "./pages/Setup/Radiology/unit";
// import RadiologyParameterList from "./pages/Setup/Radiology/Radilogy parameter";
// import ProductList from "./pages/Setup/BloodBankSetup";
// import SymptomsList from "./pages/Setup/Symptoms/Symptoms";
// import SymptomsTypeList from "./pages/Setup/Symptoms/Symptomstype";
// import FindingsList from "./pages/Setup/findings/Findings";
// import SettingsForm from "./pages/Setup/ZoomSetting";
// import HumanResource from "./pages/HumanResource";
// import ChargesTable from "./pages/Setup/Hospitalcharges/chargestable";
// import ChargecategoryList from "./pages/Setup/Hospitalcharges/chargecategory";
// import ChargeTypeList from "./pages/Setup/Hospitalcharges/chargetype";
// import TaxCategoryList from "./pages/Setup/Hospitalcharges/taxcategory";
// import UnitTypeList from "./pages/Setup/Hospitalcharges/unit";
// import LeaveTypeList from "./pages/Setup/Humanresource/Humanresource";
// import DepartmentList from "./pages/Setup/Humanresource/department";
// import DesignationList from "./pages/Setup/Humanresource/designatio";
// import SpecialistList from "./pages/Setup/Humanresource/specialist";
// import Referral from "./pages/Setup/Referral";
// import ReferralCommissionList from "./pages/Setup/Refferal/Referral";
// import ReferralCategoryList from "./pages/Setup/Refferal/Refferalcategory";
// import ComplaintTypeList from "./pages/Setup/FrontOffice/complaint list";
// import SourceList from "./pages/Setup/FrontOffice/source";
// import AppointmentPriorityList from "./pages/Setup/FrontOffice/Appoinmentpriority";
// import AppointmentSetup from "./pages/Setup/AppointmentSetup";
// import Inventoryx from "./pages/Setup/Inventory";
// import Inventory  from "./pages/Inventory";
// import CustomFieldForm from "./pages/Setup/CustomFields";
// import  IncomeHeadList from "./pages/Setup/finance/FinanceSetup";

// // New Submodules
// import BirthRecord from "./pages/BirthDeath/BirthRecord";
// import DeathRecord from "./pages/BirthDeath/DeathRecord";
// import Income from "./pages/Finance/Income";
// import Expenses from "./pages/Finance/Expenses";
// import Certificate from "./pages/Certificate/Certificate";
// import PatientIDCard from "./pages/Certificate/PatientIDCard";
// import StaffIDCard from "./pages/Certificate/StaffIDCard";
// import LiveConsultation from "./pages/LiveConsultation/LiveConsultation";
// import LiveMeeting from "./pages/LiveConsultation/LiveMeeting";

// // Reports Submodules
// import DailyTransactionReport from "./pages/Reports/DailyTransactionReport";
// import AllTransactionReport from "./pages/Reports/AllTransactionReport";
// import AppointmentReport from "./pages/Reports/AppointmentReport";
// import OPDReport from "./pages/Reports/OPDReport";
// import IPDReport from "./pages/Reports/IPDReport";

// import OPDBalanceReport from "./pages/Reports/OPDBalanceReport";
// import IPDBalanceReport from "./pages/Reports/IPDBalanceReport";
// import OPDDischargedPatient from "./pages/Reports/OPDDischargedPatient";
// import IPDDischargedPatient from "./pages/Reports/IPDDischargedPatient";
// import PharmacyBillReport from "./pages/Reports/PharmacyBillReport";
// import ExpiryMedicineReport from "./pages/Reports/ExpiryMedicineReport";
// import PathologyPatientReport from "./pages/Reports/PathologyPatientReport";
// import RadiologyPatientReport from "./pages/Reports/RadiologyPatientReport";
// import OTReport from "./pages/Reports/OTReport";
// import BloodIssueReport from "./pages/Reports/BloodIssueReport";
// import ComponentIssueReport from "./pages/Reports/ComponentIssueReport";
// import BloodDonorReport from "./pages/Reports/BloodDonorReport";
// import LiveConsultationReport from "./pages/Reports/LiveConsultationReport";
// import LiveMeetingReport from "./pages/Reports/LiveMeetingReport";
// import TPAReport from "./pages/Reports/TPAReport";
// import IncomeGroupReport from "./pages/Reports/IncomeGroupReport";
// import ExpenseReport from "./pages/Reports/ExpenseReport";
// import ExpenseGroupReport from "./pages/Reports/ExpenseGroupReport";
// import AmbulanceReport from "./pages/Reports/AmbulanceReport";
// import BirthReport from "./pages/Reports/BirthReport";
// import DeathReport from "./pages/Reports/DeathReport";
// import PayrollMonthReport from "./pages/Reports/PayrollMonthReport";
// import PayrollReport from "./pages/Reports/PayrollReport";
// import StaffAttendanceReport from "./pages/Reports/StaffAttendanceReport";
// import UserLog from "./pages/Reports/UserLog";
// import PatientLoginCredential from "./pages/Reports/PatientLoginCredential";
// import EmailSMSLog from "./pages/Reports/EmailSMSLog";
// import InventoryStockReport from "./pages/Reports/InventoryStockReport";
// import InventoryItemReport from "./pages/Reports/InventoryItemReport";
// import InventoryIssueReport from "./pages/Reports/InventoryIssueReport";
// import AuditTrailReport from "./pages/Reports/AuditTrailReport";
// import PatientVisitReport from "./pages/Reports/PatientVisitReport";
// import PatientBillReport from "./pages/Reports/PatientBillReport";
// import ReferralReport from "./pages/Reports/ReferralReport";
// import TPAManagement from "./pages/TPAManagement";
// import Messaging from "./pages/Messaging";
// import DownloadCenter from "./pages/DownloadCenter";
// import BloodComponentIssue from "./pages/BloodComponentIssue";
// import FindingCategoryList from "./pages/Setup/findings/category";
// import FrontOfficel from "./pages/Setup/FrontOffice/FrontOffice";
// import ExpenseHeadList from "./pages/Setup/finance/icome";



// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Login />, // Public route for login
//   },
//   {
//     path: "/",
//     element: <PrivateRoute element={<Layout />} />, // Protected layout route (header, sidebar)
//     children: [
//       { path: "dashboard", element: <PrivateRoute element={<Dashboard />} /> },
//       { path: "billing", element: <PrivateRoute element={<Billing />} /> },
//       { path: "appointment", element: <PrivateRoute element={<AppointmentPage />} /> },
//       { path: "appointment/:id", element: <PrivateRoute element={<AppointmentDetails />} /> },
//       { path: "opd-out-patient", element: <PrivateRoute element={<OPD />} /> },
//       { path: "ipd-in-patient", element: <PrivateRoute element={<IPD />} /> },
//       { path: "pharmacy", element: <PrivateRoute element={<Pharmacy />} /> },
//       { path: "pathology", element: <PrivateRoute element={<Pathology />} /> },
//       { path: "radiology", element: <PrivateRoute element={<Radiology />} /> },
//       { path: "blood-bank", element: <PrivateRoute element={<BloodBank />} /> },
//       {path: "blood-component-issue", element:<PrivateRoute element={<BloodComponentIssue/>}/> },
//       { path: "ambulance", element: <PrivateRoute element={<Ambulance />} /> },
//       { path: "front-office", element: <PrivateRoute element={<FrontOffice />} /> },
//       {path:"human-resource", element: <PrivateRoute element={<HumanResource />} />},
//       {path:"referral", element: <PrivateRoute element={<Referral/>} />},
//       {path:"tpa-management", element: <PrivateRoute element={<TPAManagement/>} />},
//       {path: "messaging", element:<PrivateRoute element={<Messaging/>} />},
//       {path:"inventory", element: <PrivateRoute element={<Inventoryx/>} />},
//       {path:"front-cms", element:<PrivateRoute element={<FrontCMS/>} />},
//       {path:"download-centre", element: <PrivateRoute element={<DownloadCenter/>} />},

//       // Setup Routes
//       { path: "setup", element: <PrivateRoute element={<Setup />} /> },
//       { path: "setup/settings", element: <PrivateRoute element={<Settings />} /> },
//       { path: "setup/patient", element: <PrivateRoute element={<PatientList />} /> },
//       { path: "setup/hospital-charges", element: <PrivateRoute element={<ChargesTable />} /> },
//       { path: "setup/charge-category", element:<PrivateRoute element={<ChargecategoryList/>}/>},
//       { path: "setup/chargetype", element:<PrivateRoute element={<ChargeTypeList/>}/>},
//       { path: "setup/taxtype", element:<PrivateRoute element={<TaxCategoryList/>}/>},
//       { path: "setup/unittype", element:<PrivateRoute element={<UnitTypeList/>}/>},
//       { path: "setup/bed", element: <PrivateRoute element={<BedclassList />} /> },
//       { path: "setup/bedclass", element: <PrivateRoute element={<BedList />} /> },
//       { path: "setup/bedclasstype", element: <PrivateRoute element={<BedTypeList />} /> },
//       { path: "setup/bedgroup", element: <PrivateRoute element={<BedGroupList />} /> },
//       { path: "setup/floor", element: <PrivateRoute element={<FloorList/>} /> },
//       { path: "setup/print-header-footer", element: <PrivateRoute element={<PrintHeaderFooter />} /> },
//       { path: "setup/front-office", element: <PrivateRoute element={<FrontOfficel />} /> },
//       { path: "setup/complaint", element: <PrivateRoute element={<ComplaintTypeList />} /> },
//       { path: "setup/sourcelist", element: <PrivateRoute element={<SourceList />} /> },
//       { path: "setup/appoinmentprioritylist", element: <PrivateRoute element={<AppointmentPriorityList />} /> },
//       { path: "setup/operations", element: <PrivateRoute element={<OperationCategoryList />} /> },
//       { path: "setup/operationsl", element: <PrivateRoute element={<OperationList />} /> },
//       { path: "setup/pharmacy", element: <PrivateRoute element={<PharmacyList />} /> },
//       { path: "setup/supplier", element: <PrivateRoute element={<SupplierList />} /> },
//       { path: "setup/medicinedoasagelist", element: <PrivateRoute element={<MedicineDosageList />} /> },
//       { path: "setup/doasagelist", element: <PrivateRoute element={<DosageIntervalList />} /> },
//       { path: "setup/doasagedurationlist", element: <PrivateRoute element={<DosageDurationList/>} /> },
//       { path: "setup/pathology", element: <PrivateRoute element={<PathologySetup />} /> },
//       { path: "setup/unit", element: <PrivateRoute element={<UnitList />} /> },
//       { path: "setup/parameterlist", element: <PrivateRoute element={<PathologyParameterList />} /> },
//       { path: "setup/radiology", element: <PrivateRoute element={<RadiologyCategoryList />} /> },
//       { path: "setup/radiounit", element: <PrivateRoute element={<UnitListl />} /> },
//       { path: "setup/radio", element: <PrivateRoute element={<RadiologyParameterList />} /> },
//       { path: "setup/blood-bank", element: <PrivateRoute element={<ProductList />} /> },
//       { path: "setup/symptoms", element: <PrivateRoute element={<SymptomsList />} /> },
//       { path: "setup/symptomslist", element: <PrivateRoute element={<SymptomsTypeList />} /> },
//       { path: "setup/findings", element: <PrivateRoute element={<FindingsList />} /> },
//       { path: "setup/Category", element: <PrivateRoute element={<FindingCategoryList />} /> },
//       { path: "setup/zoom-setting", element: <PrivateRoute element={<SettingsForm />} /> },
//       { path: "setup/finance", element: <PrivateRoute element={< IncomeHeadList/>} /> },
//       { path: "setup/expensedfinance", element: <PrivateRoute element={< ExpenseHeadList/>} /> },
//       { path: "setup/human-resource", element: <PrivateRoute element={<LeaveTypeList />} /> },
//       { path: "setup/department", element:<PrivateRoute element={<DepartmentList/>}/>},
//       { path: "setup/designatio", element:<PrivateRoute element={<DesignationList/>}/>},
//       { path: "setup/specialist", element:<PrivateRoute element={<SpecialistList />}/>},
//       { path: "setup/referral", element: <PrivateRoute element={<ReferralCommissionList />} /> },
//       { path: "setup/referral/category", element: <PrivateRoute element={<ReferralCategoryList/>} />},
//       { path: "setup/appointment", element: <PrivateRoute element={<AppointmentSetup />} /> },
//       { path: "setup/inventory", element: <PrivateRoute element={<Inventory />} /> },
//       { path: "setup/custom-fields", element: <PrivateRoute element={<CustomFieldForm />} /> },

//       // Birth & Death Record Submodules
//       { path: "birth-death-record/birth", element: <PrivateRoute element={<BirthRecord />} /> },
//       { path: "birth-death-record/death", element: <PrivateRoute element={<DeathRecord />} /> },

//       // Finance Submodules
//       { path: "finance/income", element: <PrivateRoute element={<Income />} /> },
//       { path: "finance/expenses", element: <PrivateRoute element={<Expenses />} /> },

//       // Certificate Submodules
//       {path: "certificate/certificate", element: <PrivateRoute element={<Certificate/>} /> },
//       { path: "certificate/patient-id-card", element: <PrivateRoute element={<PatientIDCard />} /> },
//       { path: "certificate/staff-id-card", element: <PrivateRoute element={<StaffIDCard />} /> },

//       // Live Consultation Submodules
//       { path: "live-consultation/consultation", element: <PrivateRoute element={<LiveConsultation />} /> },
//       { path: "live-consultation/meeting", element: <PrivateRoute element={<LiveMeeting />} /> },

//       // Reports Submodules (All the submodules you listed)
//       { path: "reports/daily-transaction", element: <PrivateRoute element={<DailyTransactionReport />} /> },
//       { path: "reports/all-transaction", element: <PrivateRoute element={<AllTransactionReport />} /> },
//       { path: "reports/appointment-report", element: <PrivateRoute element={<AppointmentReport />} /> },
//       { path: "reports/opd-report", element: <PrivateRoute element={<OPDReport />} /> },
//       { path: "reports/ipd-report", element: <PrivateRoute element={<IPDReport />} /> },
//       { path: "reports/opd-balance-report", element: <PrivateRoute element={<OPDBalanceReport />} /> },
//       { path: "reports/ipd-balance-report", element: <PrivateRoute element={<IPDBalanceReport />} /> },
//       { path: "reports/opd-discharged-patient", element: <PrivateRoute element={<OPDDischargedPatient />} /> },
//       { path: "reports/ipd-discharged-patient", element: <PrivateRoute element={<IPDDischargedPatient />} /> },
//       { path: "reports/pharmacy-bill-report", element: <PrivateRoute element={<PharmacyBillReport />} /> },
//       { path: "reports/expiry-medicine-report", element: <PrivateRoute element={<ExpiryMedicineReport />} /> },
//       { path: "reports/pathology-patient-report", element: <PrivateRoute element={<PathologyPatientReport />} /> },
//       { path: "reports/radiology-patient-report", element: <PrivateRoute element={<RadiologyPatientReport />} /> },
//       { path: "reports/ot-report", element: <PrivateRoute element={<OTReport />} /> },
//       { path: "reports/blood-issue-report", element: <PrivateRoute element={<BloodIssueReport />} /> },
//       { path: "reports/component-issue-report", element: <PrivateRoute element={<ComponentIssueReport />} /> },
//       { path: "reports/blood-donor-report", element: <PrivateRoute element={<BloodDonorReport />} /> },
//       { path: "reports/live-consultation-report", element: <PrivateRoute element={<LiveConsultationReport />} /> },
//       { path: "reports/live-meeting-report", element: <PrivateRoute element={<LiveMeetingReport />} /> },
//       { path: "reports/tpa-report", element: <PrivateRoute element={<TPAReport />} /> },
//       { path: "reports/income-group-report", element: <PrivateRoute element={<IncomeGroupReport />} /> },
//       { path: "reports/expense-report", element: <PrivateRoute element={<ExpenseReport />} /> },
//       { path: "reports/expense-group-report", element: <PrivateRoute element={<ExpenseGroupReport />} /> },
//       { path: "reports/ambulance-report", element: <PrivateRoute element={<AmbulanceReport />} /> },
//       { path: "reports/birth-report", element: <PrivateRoute element={<BirthReport />} /> },
//       { path: "reports/death-report", element: <PrivateRoute element={<DeathReport />} /> },
//       { path: "reports/payroll-month-report", element: <PrivateRoute element={<PayrollMonthReport />} /> },
//       { path: "reports/payroll-report", element: <PrivateRoute element={<PayrollReport />} /> },
//       { path: "reports/staff-attendance-report", element: <PrivateRoute element={<StaffAttendanceReport />} /> },
//       { path: "reports/user-log", element: <PrivateRoute element={<UserLog />} /> },
//       { path: "reports/patient-login-credential", element: <PrivateRoute element={<PatientLoginCredential />} /> },
//       { path: "reports/email-sms-log", element: <PrivateRoute element={<EmailSMSLog />} /> },
//       { path: "reports/inventory-stock-report", element: <PrivateRoute element={<InventoryStockReport />} /> },
//       { path: "reports/inventory-item-report", element: <PrivateRoute element={<InventoryItemReport />} /> },
//       { path: "reports/inventory-issue-report", element: <PrivateRoute element={<InventoryIssueReport />} /> },
//       { path: "reports/audit-trail-report", element: <PrivateRoute element={<AuditTrailReport />} /> },
//       { path: "reports/patient-visit-report", element: <PrivateRoute element={<PatientVisitReport />} /> },
//       { path: "reports/patient-bill-report", element: <PrivateRoute element={<PatientBillReport />} /> },
//       { path: "reports/referral-report", element: <PrivateRoute element={<ReferralReport />} /> },
//     ],
//   },
// ]);

// function App() {
//   return <RouterProvider router={router} />;
// }





import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Billing from "./pages/Billing";
import OPD from "./pages/OPD";
import IPD from "./pages/IPD";
import Pharmacy from "./pages/Pharmacy";
import Pathology from "./pages/Pathology";
import Radiology from "./pages/Radiology";
import BloodBank from "./pages/blood bank/BloodBank";
import BloodDonorDetails from "./pages/blood bank/donar";
import Ambulance from "./pages/Ambulance";
import FrontOffice from "./pages/FrontOffice";
import FrontCMS from "./pages/FrontCMS";
import AppointmentDetails from "./pages/AppointmentDetails";
import Login from "./adminLogin/Login";
import PrivateRoute from "./components/PrivateRoute";
import AppointmentPage from "./pages/AppointmentPage";
import Setup from "./pages/Setup";
import Settings from "./pages/Setup/Settings";
import PatientList from "./pages/Setup/Patient/patient";
import BedclassList from "./pages/Setup/bed/Bedclass";
import BedList from "./pages/Setup/bed/Bed";
import BedTypeList from "./pages/Setup/bed/bedtype";
import BedGroupList from "./pages/Setup/bed/bedgroup";
import BloodComponentIssue from "./pages/BloodComponentIssue";
import FloorList from "./pages/Setup/bed/floar";
import PrintHeaderFooter from "./pages/Setup/PrintHeaderFooter";
import OperationCategoryList from "./pages/Setup/operations/Operations";
import OperationList from "./pages/Setup/operations/operationsl";
import PharmacyList from "./pages/Setup/pharmacy/PharmacySetup";
import SupplierList from "./pages/Setup/pharmacy/supplier";
import MedicineDosageList from "./pages/Setup/pharmacy/medicinedosagelist";
import DosageIntervalList from "./pages/Setup/pharmacy/dosageintervallist";
import DosageDurationList from "./pages/Setup/pharmacy/dragduration";
import PathologySetup from "./pages/Setup/Pathology/PathologySetup";
import UnitList from "./pages/Setup/Pathology/unit";
import PathologyParameterList from "./pages/Setup/Pathology/pathologyparameter";
import RadiologyCategoryList from "./pages/Setup/Radiology/Radilogylist";
import UnitListl from "./pages/Setup/Radiology/unit";
import RadiologyParameterList from "./pages/Setup/Radiology/Radilogy parameter";
import ProductList from "./pages/Setup/BloodBankSetup";
import SymptomsList from "./pages/Setup/Symptoms/Symptoms";
import SymptomsTypeList from "./pages/Setup/Symptoms/Symptomstype";
import FindingsList from "./pages/Setup/findings/Findings";
import SettingsForm from "./pages/Setup/ZoomSetting";
import HumanResource from "./pages/HumanResource";
import ChargesTable from "./pages/Setup/Hospitalcharges/chargestable";
import ChargecategoryList from "./pages/Setup/Hospitalcharges/chargecategory";
import ChargeTypeList from "./pages/Setup/Hospitalcharges/chargetype";
import TaxCategoryList from "./pages/Setup/Hospitalcharges/taxcategory";
import UnitTypeList from "./pages/Setup/Hospitalcharges/unit";
import LeaveTypeList from "./pages/Setup/Humanresource/Humanresource";
import DepartmentList from "./pages/Setup/Humanresource/department";
import DesignationList from "./pages/Setup/Humanresource/designatio";
import SpecialistList from "./pages/Setup/Humanresource/specialist";
import ReferralCommissionList from "./pages/Setup/Refferal/Referral";
import ReferralCategoryList from "./pages/Setup/Refferal/Refferalcategory";
import ComplaintTypeList from "./pages/Setup/FrontOffice/complaint list";
import SourceList from "./pages/Setup/FrontOffice/source";
import AppointmentPriorityList from "./pages/Setup/FrontOffice/Appoinmentpriority";
import AppointmentSetup from "./pages/Setup/AppointmentSetup";
import Inventory from "./pages/Setup/Inventory";
 import FrontOfficel from "./pages/Setup/FrontOffice/FrontOffice";
import CustomFieldForm from "./pages/Setup/CustomFields";
import  IncomeHeadList from "./pages/Setup/finance/FinanceSetup";
import FindingCategoryList from "./pages/Setup/findings/category";
import ExpenseHeadList from "./pages/Setup/finance/icome";
import ReferralPaymentList from "./pages/Refferal report";


// New Submodules
import BirthRecord from "./pages/BirthDeath/BirthRecord";
import DeathRecord from "./pages/BirthDeath/DeathRecord";
import Income from "./pages/Finance/Income";
import Expenses from "./pages/Finance/Expenses";
import Certificate from "./pages/Certificate/Certificate";
import PatientIDCard from "./pages/Certificate/PatientIDCard";
import StaffIDCard from "./pages/Certificate/StaffIDCard";
import LiveConsultation from "./pages/LiveConsultation/LiveConsultation";
import LiveMeeting from "./pages/LiveConsultation/LiveMeeting";

// Reports Submodules
import DailyTransactionReport from "./pages/Reports/DailyTransactionReport";
import AllTransactionReport from "./pages/Reports/AllTransactionReport";
import AppointmentReport from "./pages/Reports/AppointmentReport";
import OPDReport from "./pages/Reports/opd/OPDReport";
import IPDReport from "./pages/Reports/ipd/IPDReport";
import OPDBalanceReport from "./pages/Reports/OPDBalanceReport";
import IPDBalanceReport from "./pages/Reports/IPDBalanceReport";
import OPDDischargedPatient from "./pages/Reports/OPDDischargedPatient";
import IPDDischargedPatient from "./pages/Reports/IPDDischargedPatient";
import PharmacyBillReport from "./pages/Reports/PharmacyBillReport";
import ExpiryMedicineReport from "./pages/Reports/ExpiryMedicineReport";
import PathologyPatientReport from "./pages/Reports/PathologyPatientReport";
import RadiologyPatientReport from "./pages/Reports/RadiologyPatientReport";
import OTReport from "./pages/Reports/OTReport";
import BloodIssueReport from "./pages/Reports/blood issue/BloodIssueReport";
import ComponentIssueReport from "./pages/Reports/componentissue/ComponentIssueReport";
import BloodDonorReport from "./pages/Reports/bloaddonar/BloodDonorReport";
import LiveConsultationReport from "./pages/Reports/liveconsolution/LiveConsultationReport";
import LiveMeetingReport from "./pages/Reports/livereporting/LiveMeetingReport";
import TPAReport from "./pages/Reports/tpareport/TPAReport";
import IncomeReport from "./pages/Reports/income/IncomeReport";
import IncomeGroupReport from "./pages/Reports/incomegroup/IncomeGroupReport";
import ExpenseReport from "./pages/Reports/expense/ExpenseReport";
import ExpenseGroupReport from "./pages/Reports/expensegroup/ExpenseGroupReport";
import AmbulanceReport from "./pages/Reports/ambulance/AmbulanceReport";
import BirthReport from "./pages/Reports/birth/BirthReport";
import DeathReport from "./pages/Reports/death/DeathReport";
import PayrollMonthReport from "./pages/Reports/payroll/PayrollMonthReport";
import PayrollReport from "./pages/Reports/payrollreport/PayrollReport";
import StaffAttendanceReport from "./pages/Reports/staffattendence/StaffAttendanceReport";
import UserLog from "./pages/Reports/userlog/UserLog";
import PatientLoginCredential from "./pages/Reports/patientlogin/PatientLoginCredential";
import EmailSMSLog from "./pages/Reports/emailsms/EmailSMSLog";
import InventoryStockReport from "./pages/Reports/inventorystock/InventoryStockReport";
import InventoryItemReport from "./pages/Reports/Inventoryitemreport/InventoryItemReport";
import InventoryIssueReport from "./pages/Reports/Inventoryissue/InventoryIssueReport";
import AuditTrailReport from "./pages/Reports/audittrail/AuditTrailReport";
import PatientVisitReport from "./pages/Reports/patientvisitreport/PatientVisitReport";
import PatientBillReport from "./pages/Reports/patientbillreport/PatientBillReport";
import ReferralReport from "./pages/Reports/Refeeralreport/ReferralReport";
 import TPAManagement from "./pages/TPAManagement";
 import Messaging from "./pages/Messaging";
 import DownloadCenter from "./pages/DownloadCenter";
import BloodIssueDetails from "./pages/blood bank/blood issuedeatils";
import ComponentsIssueDetails from "./pages/blood bank/component";
import ComponentsList from "./pages/blood bank/compdetails";
import PhoneCallLog from "./pages/phonecalllog";
import ComplaintsList from "./pages/complainent";
import StaffForm from "./pages/staffiddetails";
import AttendancePage from "./pages/Attendencepage";
import PayrollPage from "./pages/payrollpage";
import LeavesPage from "./pages/Leavespage";
import ApproveLeaveRequest from "./pages/ApproveleaveRequest";
import DoctorShiftTable from "./pages/Setup/Doctorshift";
import ShiftTable from "./pages/Setup/shift";
import CalendarPage from "./components/calendarpage";

// Router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />, // Public route for login
  },
  {
    path: "/",
    element: <PrivateRoute element={<Layout />} />, // Protected layout route (header, sidebar)
    children: [
     
      { path: "dashboard", element: <PrivateRoute element={<Dashboard />} /> },
      { path: "billing", element: <PrivateRoute element={<Billing />} /> },
      { path: "appointment", element: <PrivateRoute element={<AppointmentPage />} /> },
      { path: "appointment/:id", element: <PrivateRoute element={<AppointmentDetails />} /> },
      { path: "opd-out-patient", element: <PrivateRoute element={<OPD />} /> },
      { path: "ipd-in-patient", element: <PrivateRoute element={<IPD />} /> },
      { path: "calendarpage", element: <PrivateRoute element={<CalendarPage />} /> },
      { path: "pharmacy", element: <PrivateRoute element={<Pharmacy />} /> },
      { path: "pathology", element: <PrivateRoute element={<Pathology />} /> },
      { path: "radiology", element: <PrivateRoute element={<Radiology />} /> },
      { path: "blood-bank", element: <PrivateRoute element={<BloodBank />} /> },
      { path: "blood-bankdestails", element: <PrivateRoute element={<BloodDonorDetails />} /> },
      { path: "blood-bankissuedeatils", element: <PrivateRoute element={<BloodIssueDetails />} /> },
      {path: "blood-component-issue", element:<PrivateRoute element={<BloodComponentIssue/>}/> },
      { path: "Component-issuedeatils", element: <PrivateRoute element={< ComponentsIssueDetails />} /> },
      { path: "Component-deatils", element: <PrivateRoute element={< ComponentsList />} /> },
      { path: "ambulance", element: <PrivateRoute element={<Ambulance />} /> },
      { path: "front-office", element: <PrivateRoute element={<FrontOffice />} /> },
      { path: "phone-calllog", element: <PrivateRoute element={<  PhoneCallLog />} /> },
      { path: "Complainents", element: <PrivateRoute element={< ComplaintsList />} /> },
      {path:"human-resource", element: <PrivateRoute element={<HumanResource />} />},
      {path:"staffid", element: <PrivateRoute element={<StaffForm />} />},
      {path:"Attendencepage", element: <PrivateRoute element={<AttendancePage />} />},
      {path:"payrollpage", element: <PrivateRoute element={<PayrollPage />} />},
      {path:"leavespage", element: <PrivateRoute element={<LeavesPage/>} />},
      {path:"Approveleavepage", element: <PrivateRoute element={<ApproveLeaveRequest />} />},
      {path:"tpa-management", element: <PrivateRoute element={<TPAManagement/>} />},
      {path: "messaging", element:<PrivateRoute element={<Messaging/>} />},
      {path:"inventory", element: <PrivateRoute element={<Inventory/>} />},
      {path:"front-cms", element:<PrivateRoute element={<FrontCMS/>} />},
      {path:"download-centre", element: <PrivateRoute element={<DownloadCenter/>} />},
      {path:"refferal-centre", element: <PrivateRoute element={<ReferralPaymentList/>} />},

      // Setup Routes
      { path: "setup", element: <PrivateRoute element={<Setup />} /> },
      { path: "setup/settings", element: <PrivateRoute element={<Settings />} /> },
            { path: "setup/patient", element: <PrivateRoute element={<PatientList />} /> },
            { path: "setup/hospital-charges", element: <PrivateRoute element={<ChargesTable />} /> },
            { path: "setup/charge-category", element:<PrivateRoute element={<ChargecategoryList/>}/>},
            { path: "setup/chargetype", element:<PrivateRoute element={<ChargeTypeList/>}/>},
            { path: "setup/taxtype", element:<PrivateRoute element={<TaxCategoryList/>}/>},
            { path: "setup/unittype", element:<PrivateRoute element={<UnitTypeList/>}/>},
            { path: "setup/bed", element: <PrivateRoute element={<BedclassList />} /> },
            { path: "setup/bedclass", element: <PrivateRoute element={<BedList />} /> },
            { path: "setup/bedclasstype", element: <PrivateRoute element={<BedTypeList />} /> },
            { path: "setup/bedgroup", element: <PrivateRoute element={<BedGroupList />} /> },
            { path: "setup/floor", element: <PrivateRoute element={<FloorList/>} /> },
            { path: "setup/print-header-footer", element: <PrivateRoute element={<PrintHeaderFooter />} /> },
            { path: "setup/front-office", element: <PrivateRoute element={<FrontOfficel />} /> },
            { path: "setup/complaint", element: <PrivateRoute element={<ComplaintTypeList />} /> },
            { path: "setup/sourcelist", element: <PrivateRoute element={<SourceList />} /> },
            { path: "setup/appoinmentprioritylist", element: <PrivateRoute element={<AppointmentPriorityList />} /> },
            { path: "setup/operations", element: <PrivateRoute element={<OperationCategoryList />} /> },
            { path: "setup/operationsl", element: <PrivateRoute element={<OperationList />} /> },
            { path: "setup/pharmacy", element: <PrivateRoute element={<PharmacyList />} /> },
            { path: "setup/supplier", element: <PrivateRoute element={<SupplierList />} /> },
            { path: "setup/medicinedoasagelist", element: <PrivateRoute element={<MedicineDosageList />} /> },
            { path: "setup/doasagelist", element: <PrivateRoute element={<DosageIntervalList />} /> },
            { path: "setup/doasagedurationlist", element: <PrivateRoute element={<DosageDurationList/>} /> },
            { path: "setup/pathology", element: <PrivateRoute element={<PathologySetup />} /> },
            { path: "setup/unit", element: <PrivateRoute element={<UnitList />} /> },
            { path: "setup/parameterlist", element: <PrivateRoute element={<PathologyParameterList />} /> },
            { path: "setup/radiology", element: <PrivateRoute element={<RadiologyCategoryList />} /> },
            { path: "setup/radiounit", element: <PrivateRoute element={<UnitListl />} /> },
            { path: "setup/radio", element: <PrivateRoute element={<RadiologyParameterList />} /> },
            { path: "setup/blood-bank", element: <PrivateRoute element={<ProductList />} /> },
            { path: "setup/symptoms", element: <PrivateRoute element={<SymptomsList />} /> },
            { path: "setup/symptomslist", element: <PrivateRoute element={<SymptomsTypeList />} /> },
            { path: "setup/findings", element: <PrivateRoute element={<FindingsList />} /> },
            { path: "setup/Category", element: <PrivateRoute element={<FindingCategoryList />} /> },
            { path: "setup/zoom-setting", element: <PrivateRoute element={<SettingsForm />} /> },
            { path: "setup/finance", element: <PrivateRoute element={< IncomeHeadList/>} /> },
            { path: "setup/expensedfinance", element: <PrivateRoute element={< ExpenseHeadList/>} /> },
            { path: "setup/human-resource", element: <PrivateRoute element={<LeaveTypeList />} /> },
            { path: "setup/department", element:<PrivateRoute element={<DepartmentList/>}/>},
            { path: "setup/designatio", element:<PrivateRoute element={<DesignationList/>}/>},
            { path: "setup/specialist", element:<PrivateRoute element={<SpecialistList />}/>},
            { path: "setup/referral", element: <PrivateRoute element={<ReferralCommissionList />} /> },
            { path: "setup/referral/category", element: <PrivateRoute element={<ReferralCategoryList/>} />},
            { path: "setup/appointment", element: <PrivateRoute element={<AppointmentSetup />} /> },
            { path: "setup/doctorshift", element: <PrivateRoute element={<DoctorShiftTable />} /> },
            { path: "setup/shift", element: <PrivateRoute element={<ShiftTable />} /> },
            { path: "setup/inventory", element: <PrivateRoute element={<Inventory />} /> },
            { path: "setup/custom-fields", element: <PrivateRoute element={<CustomFieldForm />} /> },
      
      // Birth & Death Record Submodules
      { path: "birth-death-record/birth", element: <PrivateRoute element={<BirthRecord />} /> },
      { path: "birth-death-record/death", element: <PrivateRoute element={<DeathRecord />} /> },

      // Finance Submodules
      { path: "finance/income", element: <PrivateRoute element={<Income />} /> },
      { path: "finance/expenses", element: <PrivateRoute element={<Expenses />} /> },

      // Certificate Submodules
      {path: "certificate/certificate", element: <PrivateRoute element={<Certificate/>} /> },
      { path: "certificate/patient-id-card", element: <PrivateRoute element={<PatientIDCard />} /> },
      { path: "certificate/staff-id-card", element: <PrivateRoute element={<StaffIDCard />} /> },

      // Live Consultation Submodules
      { path: "live-consultation/consultation", element: <PrivateRoute element={<LiveConsultation />} /> },
      { path: "live-consultation/meeting", element: <PrivateRoute element={<LiveMeeting />} /> },

      // Reports Submodules (All the submodules you listed)
      { path: "reports/daily-transaction", element: <PrivateRoute element={<DailyTransactionReport />} /> },
      { path: "reports/all-transaction", element: <PrivateRoute element={<AllTransactionReport />} /> },
      { path: "reports/appointment-report", element: <PrivateRoute element={<AppointmentReport />} /> },
      { path: "reports/opd-report", element: <PrivateRoute element={<OPDReport />} /> },
      { path: "reports/ipd-report", element: <PrivateRoute element={<IPDReport />} /> },
      { path: "reports/opd-balance-report", element: <PrivateRoute element={<OPDBalanceReport />} /> },
      { path: "reports/ipd-balance-report", element: <PrivateRoute element={<IPDBalanceReport />} /> },
      { path: "reports/opd-discharged-patient", element: <PrivateRoute element={<OPDDischargedPatient />} /> },
      { path: "reports/ipd-discharged-patient", element: <PrivateRoute element={<IPDDischargedPatient />} /> },
      { path: "reports/pharmacy-bill-report", element: <PrivateRoute element={<PharmacyBillReport />} /> },
      { path: "reports/expiry-medicine-report", element: <PrivateRoute element={<ExpiryMedicineReport />} /> },
      { path: "reports/pathology-patient-report", element: <PrivateRoute element={<PathologyPatientReport />} /> },
      { path: "reports/radiology-patient-report", element: <PrivateRoute element={<RadiologyPatientReport />} /> },
      { path: "reports/ot-report", element: <PrivateRoute element={<OTReport />} /> },
      { path: "reports/blood-issue-report", element: <PrivateRoute element={<BloodIssueReport />} /> },
      { path: "reports/component-issue-report", element: <PrivateRoute element={<ComponentIssueReport />} /> },
      { path: "reports/blood-donor-report", element: <PrivateRoute element={<BloodDonorReport />} /> },
      { path: "reports/live-consultation-report", element: <PrivateRoute element={<LiveConsultationReport />} /> },
      { path: "reports/live-meeting-report", element: <PrivateRoute element={<LiveMeetingReport />} /> },
      { path: "reports/tpa-report", element: <PrivateRoute element={<TPAReport />} /> },
      { path: "reports/income-report", element: <PrivateRoute element={<IncomeReport/>} /> },
      { path: "reports/income-group-report", element: <PrivateRoute element={<IncomeGroupReport />} /> },
      { path: "reports/expense-report", element: <PrivateRoute element={<ExpenseReport />} /> },
      { path: "reports/expense-group-report", element: <PrivateRoute element={<ExpenseGroupReport />} /> },
      { path: "reports/ambulance-report", element: <PrivateRoute element={<AmbulanceReport />} /> },
      { path: "reports/birth-report", element: <PrivateRoute element={<BirthReport />} /> },
      { path: "reports/death-report", element: <PrivateRoute element={<DeathReport />} /> },
      { path: "reports/payroll-month-report", element: <PrivateRoute element={<PayrollMonthReport />} /> },
      { path: "reports/payroll-report", element: <PrivateRoute element={<PayrollReport />} /> },
      { path: "reports/staff-attendance-report", element: <PrivateRoute element={<StaffAttendanceReport />} /> },
      { path: "reports/user-log", element: <PrivateRoute element={<UserLog />} /> },
      { path: "reports/patient-login-credential", element: <PrivateRoute element={<PatientLoginCredential />} /> },
      { path: "reports/email-sms-log", element: <PrivateRoute element={<EmailSMSLog />} /> },
      { path: "reports/inventory-stock-report", element: <PrivateRoute element={<InventoryStockReport />} /> },
      { path: "reports/inventory-item-report", element: <PrivateRoute element={<InventoryItemReport />} /> },
      { path: "reports/inventory-issue-report", element: <PrivateRoute element={<InventoryIssueReport />} /> },
      { path: "reports/audit-trail-report", element: <PrivateRoute element={<AuditTrailReport />} /> },
      { path: "reports/patient-visit-report", element: <PrivateRoute element={<PatientVisitReport />} /> },
      { path: "reports/patient-bill-report", element: <PrivateRoute element={<PatientBillReport />} /> },
      { path: "reports/referral-report", element: <PrivateRoute element={<ReferralReport />} /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
