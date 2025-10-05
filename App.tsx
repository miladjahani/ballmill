import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Separator } from "./components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./components/ui/tooltip";
import { Progress } from "./components/ui/progress";
import { Badge } from "./components/ui/badge";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "./components/ui/alert";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./components/ui/tabs";
import {
  Settings,
  Calculator,
  BarChart3,
  HelpCircle,
  Ruler,
  Gauge,
  Layers,
  Zap,
  Target,
  Globe,
  TrendingUp,
  Percent,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Loader2,
  RefreshCw,
  Database,
  FileText,
  Beaker,
  Cog,
  Building2,
  Wand2
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { ImageWithFallback } from "./components/figma/ImageWithFallback";
import ComprehensiveMaterialDatabase from "./components/ComprehensiveMaterialDatabase";
import AdvancedCalculations from "./components/AdvancedCalculations";
import ProfessionalReport from "./components/ProfessionalReport";
import EnhancedBallCharging from "./components/EnhancedBallCharging";
import IntelligentDesignAssistant from "./components/IntelligentDesignAssistant";
import ThemeToggle from "./components/ThemeToggle";

// Default values based on engineering standards
const defaultValues = {
  D: "3.0", // Typical mill diameter 3m
  L: "4.0", // Typical mill length 4m
  Wi: "15.0", // Work index for medium hardness ore
  F80: "2000", // Feed size 2000 microns
  darsad_bar: "40", // Ball charge 40%
  chegali_golole: "7.8", // Steel ball density
  takhalkhol: "40", // Porosity 40%
  Sg: "2.7", // Specific gravity of ore
  k: "400", // Size reduction constant
  Cs: "72", // Critical speed percentage
};

// Parameter information with Persian descriptions
const parameterInfo = {
  D: {
    name: "قطر آسیاب (Mill Diameter)",
    description:
      "قطر داخلی آسیاب گلوله‌ای به متر. معمولاً بین ۱ تا ۶ متر",
    unit: "متر",
    range: "1-6",
    icon: Ruler,
  },
  L: {
    name: "طول آسیاب (Mill Length)",
    description:
      "طول داخلی آسیاب به متر. معمولاً بین ۱ تا ۱۰ متر",
    unit: "متر",
    range: "1-10",
    icon: Ruler,
  },
  Wi: {
    name: "شاخص کار (Work Index)",
    description:
      "انرژی مورد نیاز برای کاهش اندازه ماده. برای سنگ‌های متوسط ۱۰-۲۵",
    unit: "kWh/t",
    range: "10-25",
    icon: Zap,
  },
  F80: {
    name: "اندازه خوراک F80",
    description: "اندازه‌ای که ۸۰٪ خوراک از آن کوچکتر است",
    unit: "میکرون",
    range: "100-10000",
    icon: Target,
  },
  darsad_bar: {
    name: "درصد بار گلوله‌ای",
    description:
      "درصد حجم آسیاب که با گلوله پر شده. معمولاً ۳۵-۴۵٪",
    unit: "درصد",
    range: "35-45",
    icon: Percent,
  },
  chegali_golole: {
    name: "چگالی گلوله‌های فولادی",
    description: "چگالی مواد گلوله‌ها. برای فولاد حدود ۷.۸",
    unit: "t/m³",
    range: "7.6-7.9",
    icon: Globe,
  },
  takhalkhol: {
    name: "تخلخل بین گلوله‌ها",
    description: "درصد فضای خالی بین گلوله‌ها. معمولاً ۳۵-۴۵٪",
    unit: "درصد",
    range: "35-45",
    icon: Layers,
  },
  Sg: {
    name: "وزن مخصوص ماده (Sg)",
    description:
      "وزن مخصوص ماده معدنی. برای اکثر سنگ‌ها ۲.۶-۴.۰",
    unit: "g/cm³",
    range: "2.6-4.0",
    icon: Globe,
  },
  k: {
    name: "ثابت کاهش اندازه (k)",
    description: "ثابت مربوط به خصوصیات ماده. معمولاً ۳۵۰-۵۰۰",
    unit: "-",
    range: "350-500",
    icon: Settings,
  },
  Cs: {
    name: "درصد سرعت بحرانی",
    description: "درصد سرعت بحرانی آسیاب. معمولاً ۶۵-۷۸٪",
    unit: "درصد",
    range: "65-78",
    icon: Gauge,
  },
};

export default function App() {
  const [inputs, setInputs] = useState(defaultValues);
  const [results, setResults] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [activeTab, setActiveTab] = useState("calculator");
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [showMaterialDatabase, setShowMaterialDatabase] = useState(false);
  const [generatedDesign, setGeneratedDesign] = useState(null);

  // Enhanced ball size distributions based on Morrell & Morrison methodology
  const advancedBallSizes = [12.7, 19.1, 25.4, 31.8, 38.1, 44.5, 50.8, 63.5, 76.2, 88.9, 101.6, 114.3, 127.0];
  
  const enhancedBallDistributions = {
    // Ultra-fine applications (P80 < 25 μm)
    ultraFine: {
      sizes: [12.7, 19.1, 25.4, 31.8],
      percentages: [25, 35, 25, 15],
      name: "توزیع فوق‌ریز - سیمان نهایی",
      applications: ["سیمان نهایی", "کربنات کلسیم فوق‌ریز", "پودرهای صنعتی"]
    },
    
    // Fine grinding (P80 25-75 μm)
    fine: {
      sizes: [19.1, 25.4, 31.8, 38.1, 44.5],
      percentages: [15, 25, 30, 20, 10],
      name: "توزیع ریز - مدارهای باز آسیاب",
      applications: ["باز آسیاب طلا", "باز آسیاب مس", "فرآوری مجدد کنسانتره"]
    },
    
    // Medium grinding (P80 75-150 μm)
    medium: {
      sizes: [25.4, 31.8, 38.1, 44.5, 50.8, 63.5],
      percentages: [12, 18, 22, 20, 15, 13],
      name: "توزیع متوسط - آسیاب ثانویه",
      applications: ["آسیاب ثانویه مس", "آسیاب ثانویه آهن", "فسفات راک"]
    },
    
    // Coarse grinding (P80 150-300 μm)  
    coarse: {
      sizes: [38.1, 44.5, 50.8, 63.5, 76.2, 88.9, 101.6],
      percentages: [10, 15, 18, 20, 15, 12, 10],
      name: "توزیع درشت - آسیاب اولیه",
      applications: ["آسیاب اولیه مس", "آسیاب اولیه آهن", "مواد ساختمانی"]
    },
    
    // Very coarse (P80 > 300 μm)
    veryCoarse: {
      sizes: [63.5, 76.2, 88.9, 101.6, 114.3, 127.0],
      percentages: [15, 20, 22, 18, 15, 10],
      name: "توزیع فوق‌درشت - آسیاب‌های بزرگ",
      applications: ["آسیاب‌های بزرگ معدنی", "سنگ آهک", "کلینکر خام"]
    },

    // Specialized for hard ores
    hardOres: {
      sizes: [31.8, 38.1, 44.5, 50.8, 63.5, 76.2, 88.9, 101.6],
      percentages: [8, 12, 15, 18, 17, 15, 10, 5],
      name: "توزیع ویژه سنگ‌های سخت",
      applications: ["کوارتز", "طلای مقاوم", "سنگ‌های سیلیکاته"]
    },

    // Specialized for soft ores
    softOres: {
      sizes: [19.1, 25.4, 31.8, 38.1, 44.5, 50.8, 63.5],
      percentages: [18, 22, 20, 15, 12, 8, 5],
      name: "توزیع ویژه سنگ‌های نرم",
      applications: ["فسفات", "بوکسیت", "زغال سنگ", "مواد کربناته"]
    }
  };

  const handleInputChange = (field, value) => {
    setInputs((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const loadDefaultValues = () => {
    setInputs(defaultValues);
  };

  const handleMaterialSelect = (material) => {
    setSelectedMaterial(material);
    setInputs(prev => ({
      ...prev,
      Wi: material.Wi.toString(),
      Sg: material.Sg.toString(),
      k: material.recommendedK.toString()
    }));
    setShowMaterialDatabase(false);
  };

  const handleDesignGenerated = (design) => {
    setGeneratedDesign(design);
    // Auto-populate calculator inputs based on generated design
    setInputs(prev => ({
      ...prev,
      D: design.diameter.toFixed(1),
      L: design.length.toFixed(1),
      Wi: design.selectedMaterial?.Wi?.toString() || prev.Wi,
      Sg: design.selectedMaterial?.Sg?.toString() || prev.Sg,
      k: design.selectedMaterial?.recommendedK?.toString() || prev.k,
      darsad_bar: design.ballCharge.toString(),
      Cs: design.criticalSpeed.toString()
    }));
    setSelectedMaterial(design.selectedMaterial);
    setActiveTab("calculator");
  };

  const calculateResults = async () => {
    setIsCalculating(true);

    // Simulate calculation time for better UX
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Convert inputs to numbers
    const D = parseFloat(inputs.D);
    const L = parseFloat(inputs.L);
    const Wi = parseFloat(inputs.Wi);
    const F80 = parseFloat(inputs.F80);
    const darsad_bar = parseFloat(inputs.darsad_bar);
    const chegali_golole = parseFloat(inputs.chegali_golole);
    const takhalkhol = parseFloat(inputs.takhalkhol);
    const Sg = parseFloat(inputs.Sg);
    const k = parseFloat(inputs.k);
    const Cs = parseFloat(inputs.Cs);

    // Validate inputs
    if (
      [
        D,
        L,
        Wi,
        F80,
        darsad_bar,
        chegali_golole,
        takhalkhol,
        Sg,
        k,
        Cs,
      ].some((val) => isNaN(val))
    ) {
      alert("لطفاً همه مقادیر را به درستی وارد کنید");
      setIsCalculating(false);
      return;
    }

    // Enhanced calculations with multiple methodologies
    const hajm_asiab = (Math.PI * D * D * L) / 4;
    const hajm_bar = (darsad_bar / 100) * hajm_asiab;
    const hajm_golole = hajm_bar * (1 - takhalkhol / 100);
    const vazn_glole = hajm_golole * chegali_golole;
    
    // Enhanced ball size calculation using multiple methods
    const F80_mm = F80 / 1000;
    const P80 = F80 / 8; // Typical reduction ratio
    
    // Bond's original equation (corrected for units)
    const bondBallSize = 25.4 * Math.pow((Sg * Wi * F80_mm)/(Cs/100 * Math.sqrt(D * 3.281)), 1/3);
    
    // Morrell's improved equation (2004)
    const K1 = k || 350; // Material constant from input or default
    const morellBallSize = (K1/1000) * Math.pow((Wi * F80)/(Math.sqrt(D * 1000) * (Cs/100)), 0.5);
    
    // Austin's modification for specific energy
    const specificEnergy = Wi * (1/Math.sqrt(P80) - 1/Math.sqrt(F80));
    const austinBallSize = bondBallSize * Math.pow(specificEnergy/10, 0.15);
    
    // Weighted average of methods (Bond 50%, Morrell 30%, Austin 20%)
    const b = (bondBallSize * 0.5 + morellBallSize * 0.3 + austinBallSize * 0.2);
    
    // Critical speed and operational parameters
    const criticalSpeed = 42.3 / Math.sqrt(D);
    const operatingSpeed = (Cs / 100) * criticalSpeed;
    
    // Power calculations using Morrell's approach
    const Jb = darsad_bar / 100; // Ball filling fraction
    const powerNoLoad = 1.68 * Math.pow(D, 2.05) * L * (1 - 0.1 * Jb) * Math.sqrt(Cs/100);
    const powerBalls = 10.6 * Math.pow(D, 1.35) * L * Jb * Sg * Math.sqrt(Cs/100);
    const totalPower = powerNoLoad + powerBalls;
    const netPower = totalPower * 0.75; // Mechanical efficiency
    
    // Throughput using enhanced Bond equation (corrected)
    const A = Math.pow(10, 0.4 * Math.log10(Wi) - 1.33);
    const specificEnergySGM = Wi * (1/Math.sqrt(P80) - 1/Math.sqrt(F80)); // kWh/t
    const throughput = Math.max(0.1, netPower / specificEnergySGM); // t/h
    
    // Ball wear rate (Cleary & Morrison enhanced)
    const ballWearRate = 0.024 * specificEnergy * Math.pow(operatingSpeed/criticalSpeed, 1.2) * (Sg/2.7);

    // Enhanced ball size distribution selection
    let selectedDistribution = {};
    let distributionName = "";
    
    // Intelligent selection based on multiple factors
    const P80_target = P80; // Target product size
    
    // Selection logic based on target P80 and material properties
    if (P80_target < 25) {
      selectedDistribution = enhancedBallDistributions.ultraFine;
    } else if (P80_target < 75) {
      selectedDistribution = enhancedBallDistributions.fine;
    } else if (P80_target < 150) {
      selectedDistribution = enhancedBallDistributions.medium;
    } else if (P80_target < 300) {
      selectedDistribution = enhancedBallDistributions.coarse;
    } else {
      selectedDistribution = enhancedBallDistributions.veryCoarse;
    }
    
    // Material-specific adjustments
    if (selectedMaterial) {
      if (selectedMaterial.hardness === 'سخت' || selectedMaterial.hardness === 'خیلی سخت') {
        selectedDistribution = enhancedBallDistributions.hardOres;
      } else if (selectedMaterial.hardness === 'نرم' || selectedMaterial.hardness === 'خیلی نرم') {
        selectedDistribution = enhancedBallDistributions.softOres;
      }
    } else {
      // Fallback to Wi-based selection
      if (Wi > 16) {
        selectedDistribution = enhancedBallDistributions.hardOres;
      } else if (Wi < 10) {
        selectedDistribution = enhancedBallDistributions.softOres;
      }
    }
    
    distributionName = selectedDistribution.name;

    // Prepare enhanced chart data
    const distributionChartData = selectedDistribution.sizes.map(
      (size, index) => ({
        size: `${size}mm`,
        percentage: selectedDistribution.percentages[index],
        ballSize: size,
        index,
      }),
    );

    // Enhanced efficiency calculations
    const speedRatio = operatingSpeed / criticalSpeed;
    const millingEfficiency = Math.min(95, Math.max(65, 85 - Math.abs(speedRatio - 0.75) * 50));
    const powerEfficiency = Math.min(90, (netPower / totalPower) * 100);
    const overallEfficiency = (millingEfficiency + powerEfficiency) / 2;

    setResults({
      hajm_asiab: hajm_asiab.toFixed(3),
      hajm_bar: hajm_bar.toFixed(3),
      hajm_golole: hajm_golole.toFixed(3),
      vazn_glole: vazn_glole.toFixed(3),
      b: b.toFixed(2),
      selectedDistribution: selectedDistribution.percentages,
      distributionName,
      distributionChartData,
      efficiency: overallEfficiency.toFixed(1),
      // Enhanced results
      bondBallSize: bondBallSize.toFixed(2),
      morellBallSize: morellBallSize.toFixed(2),
      austinBallSize: austinBallSize.toFixed(2),
      criticalSpeed: criticalSpeed.toFixed(1),
      operatingSpeed: operatingSpeed.toFixed(1),
      totalPower: totalPower.toFixed(0),
      netPower: netPower.toFixed(0),
      throughput: throughput.toFixed(1),
      ballWearRate: ballWearRate.toFixed(3),
      specificEnergy: specificEnergy.toFixed(2),
      millingEfficiency: millingEfficiency.toFixed(1),
      powerEfficiency: powerEfficiency.toFixed(1),
      P80: P80.toFixed(0),
      distributionObj: selectedDistribution
    });

    setIsCalculating(false);
    setActiveTab("results");
  };

  const resetForm = () => {
    setInputs({
      D: "",
      L: "",
      Wi: "",
      F80: "",
      darsad_bar: "",
      chegali_golole: "",
      takhalkhol: "",
      Sg: "",
      k: "",
      Cs: "",
    });
    setResults(null);
    setActiveTab("calculator");
  };

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7300",
  ];

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background dark:bg-background flex flex-col overflow-hidden">
        {/* App Header */}
        <motion.header 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-primary dark:bg-primary text-primary-foreground shadow-lg sticky top-0 z-50 border-b border-border/20"
        >
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="relative"
              >
                <div className="absolute inset-0 bg-white/20 rounded-full blur-md"></div>
                <Settings className="w-8 h-8 relative z-10 text-yellow-300" />
              </motion.div>
              <div>
                <h1 className="font-bold text-lg">محاسبه‌گر آسیاب</h1>
                <p className="text-xs text-primary-foreground/70">ابزار تخصصی مهندسی</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Tab Navigation - Mobile First */}
          <div className="bg-card border-b border-border/20 px-2 py-2 overflow-x-auto">
            <div className="flex gap-1 min-w-max">
              {[
                { id: "designer", icon: Wand2, label: "طراح", shortLabel: "طراح" },
                { id: "calculator", icon: Calculator, label: "محاسبه‌گر", shortLabel: "محاسبه" },
                { id: "results", icon: BarChart3, label: "نتایج", shortLabel: "نتایج" },
                { id: "charging", icon: Layers, label: "شارژ گلوله", shortLabel: "شارژ" },
                { id: "advanced", icon: Cog, label: "تحلیل پیشرفته", shortLabel: "تحلیل" },
                { id: "report", icon: FileText, label: "گزارش", shortLabel: "گزارش" },
                { id: "guide", icon: HelpCircle, label: "راهنما", shortLabel: "راهنما" }
              ].map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <tab.icon className="w-4 h-4 flex-shrink-0" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.shortLabel}</span>
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-primary rounded-lg -z-10"
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-auto">
            <div className="h-full">
              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="h-full flex flex-col"
              >
                <TabsContent value="designer" className="flex-1 m-0 p-4 overflow-auto">
                  <IntelligentDesignAssistant onDesignGenerated={handleDesignGenerated} />
                </TabsContent>

                <TabsContent value="calculator" className="flex-1 m-0 p-4 overflow-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    {/* Quick Actions */}
                    <div className="bg-card rounded-xl shadow-lg border border-border/20 overflow-hidden">
                      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-4">
                        <div className="flex items-center gap-3">
                          <Calculator className="w-6 h-6" />
                          <div>
                            <h2 className="font-bold text-lg">پارامترهای ورودی</h2>
                            <p className="text-sm opacity-90">مقادیر طراحی آسیاب را وارد کنید</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 space-y-4">
                        {/* Quick Actions */}
                        <div className="flex gap-2 flex-wrap">
                          <Button
                            onClick={loadDefaultValues}
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-2 rounded-lg"
                          >
                            <RefreshCw className="w-4 h-4" />
                            <span className="hidden sm:inline">بارگذاری مقادیر پیشفرض</span>
                            <span className="sm:hidden">پیشفرض</span>
                          </Button>
                          <Button
                            onClick={() => setShowMaterialDatabase(!showMaterialDatabase)}
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-2 rounded-lg"
                          >
                            <Database className="w-4 h-4" />
                            <span className="hidden sm:inline">پایگاه داده مواد</span>
                            <span className="sm:hidden">مواد</span>
                          </Button>
                        </div>

                        {/* Status Badges */}
                        <div className="flex gap-2 flex-wrap">
                          {selectedMaterial && (
                            <Badge variant="secondary" className="px-3 py-1 rounded-full">
                              <Beaker className="w-4 h-4 mr-2" />
                              {selectedMaterial.name}
                            </Badge>
                          )}
                          {generatedDesign && (
                            <Badge className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 rounded-full">
                              <Wand2 className="w-4 h-4 mr-2" />
                              طراحی هوشمند فعال
                            </Badge>
                          )}
                        </div>

                        {/* Alerts */}
                        {generatedDesign && (
                          <Alert className="border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800 rounded-lg">
                            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                            <AlertTitle className="text-green-800 dark:text-green-200">
                              طراحی هوشمند اعمال شد!
                            </AlertTitle>
                            <AlertDescription className="text-green-700 dark:text-green-300 text-sm">
                              پارامترهای آسیاب بر اساس نیازمندی‌های شما محاسبه شدند.
                              <div className="mt-1 font-medium">
                                طراحی: {generatedDesign.name}
                              </div>
                            </AlertDescription>
                          </Alert>
                        )}

                        {showMaterialDatabase && (
                          <div className="bg-muted/50 rounded-lg p-1">
                            <ComprehensiveMaterialDatabase onMaterialSelect={handleMaterialSelect} />
                          </div>
                        )}

                        {/* Parameters Grid */}
                        <div className="space-y-3">
                          {Object.entries(parameterInfo).map(
                            ([key, info]) => {
                              const IconComponent = info.icon;
                              return (
                                <motion.div
                                  key={key}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{
                                    delay: 0.05 * Object.keys(parameterInfo).indexOf(key),
                                  }}
                                  className="bg-background rounded-lg border border-border/20 p-3 hover:shadow-md transition-shadow"
                                >
                                  <div className="flex items-center gap-2 mb-2">
                                    <IconComponent className="w-4 h-4 text-primary flex-shrink-0" />
                                    <Label
                                      htmlFor={key}
                                      className="font-medium text-sm flex-1"
                                    >
                                      {info.name}
                                    </Label>
                                    <Tooltip>
                                      <TooltipTrigger>
                                        <HelpCircle className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />
                                      </TooltipTrigger>
                                      <TooltipContent className="max-w-xs">
                                        <p className="font-medium text-sm">
                                          {info.description}
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                          واحد: {info.unit} | محدوده: {info.range}
                                        </p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </div>
                                  <div className="relative">
                                    <Input
                                      id={key}
                                      type="number"
                                      step="0.1"
                                      value={inputs[key]}
                                      onChange={(e) =>
                                        handleInputChange(
                                          key,
                                          e.target.value,
                                        )
                                      }
                                      placeholder={`مثال: ${defaultValues[key]}`}
                                      className="pr-12 text-center font-mono rounded-lg border-2"
                                    />
                                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-xs">
                                      {info.unit}
                                    </div>
                                  </div>
                                </motion.div>
                              );
                            },
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-4 border-t border-border/20">
                          <Button
                            onClick={calculateResults}
                            disabled={isCalculating}
                            className="flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground py-3 rounded-lg font-medium"
                          >
                            {isCalculating ? (
                              <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                محاسبه...
                              </>
                            ) : (
                              <>
                                <Calculator className="w-4 h-4 mr-2" />
                                شروع محاسبه
                              </>
                            )}
                          </Button>
                          <Button
                            onClick={resetForm}
                            variant="outline"
                            className="px-4 py-3 rounded-lg"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* Progress */}
                        {isCalculating && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-muted/50 rounded-lg p-4"
                          >
                            <Progress
                              value={66}
                              className="w-full mb-2"
                            />
                            <p className="text-center text-sm text-muted-foreground">
                              انجام محاسبات پیچیده آسیاب گلوله‌ای...
                            </p>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="results" className="flex-1 m-0 p-4 overflow-auto">
                  <AnimatePresence>
                    {results ? (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-4"
                      >
                        {/* Success Alert */}
                        <Alert className="border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800 rounded-lg">
                          <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                          <AlertTitle className="text-green-800 dark:text-green-200">
                            محاسبات با موفقیت انجام شد!
                          </AlertTitle>
                          <AlertDescription className="text-green-700 dark:text-green-300 text-sm">
                            نتایج طراحی آسیاب گلوله‌ای شما آماده است.
                          </AlertDescription>
                        </Alert>

                        {/* Main Results Card */}
                        <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                          <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 dark:from-green-600 dark:to-emerald-700 text-white rounded-t-lg">
                            <CardTitle className="flex items-center gap-3 text-2xl">
                              <BarChart3 className="w-6 h-6" />
                              نتایج محاسبات آسیاب
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                              {[
                                {
                                  label: "حجم آسیاب",
                                  value: results.hajm_asiab,
                                  unit: "متر مکعب",
                                  icon: Settings,
                                  color: "blue",
                                },
                                {
                                  label: "حجم بار خردکننده",
                                  value: results.hajm_bar,
                                  unit: "متر مکعب",
                                  icon: Layers,
                                  color: "green",
                                },
                                {
                                  label: "حجم گلوله‌ها",
                                  value: results.hajm_golole,
                                  unit: "متر مکعب",
                                  icon: Globe,
                                  color: "purple",
                                },
                                {
                                  label: "وزن گلوله‌ها",
                                  value: results.vazn_glole,
                                  unit: "تن",
                                  icon: Gauge,
                                  color: "orange",
                                },
                                {
                                  label: "قطر بهترین گلوله",
                                  value: results.b,
                                  unit: "میلی‌متر",
                                  icon: Target,
                                  color: "red",
                                },
                                {
                                  label: "راندمان کلی",
                                  value: results.efficiency,
                                  unit: "درصد",
                                  icon: TrendingUp,
                                  color: "indigo",
                                },
                                {
                                  label: "ظرفیت محاسبه شده",
                                  value: results.throughput,
                                  unit: "تن/ساعت",
                                  icon: BarChart3,
                                  color: "emerald",
                                },
                                {
                                  label: "توان کل مورد نیاز",
                                  value: results.totalPower,
                                  unit: "کیلووات",
                                  icon: Zap,
                                  color: "yellow",
                                },
                              ].map((item, index) => (
                                <motion.div
                                  key={item.label}
                                  initial={{
                                    opacity: 0,
                                    scale: 0.9,
                                  }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{
                                    delay: index * 0.1,
                                  }}
                                >
                                  <Card
                                    className={`border-l-4 border-l-${item.color}-500 hover:shadow-lg transition-shadow`}
                                  >
                                    <CardContent className="p-6">
                                      <div className="flex items-center justify-between">
                                        <div>
                                          <p className="text-sm text-gray-600">
                                            {item.label}
                                          </p>
                                          <p className="text-2xl font-bold text-gray-900">
                                            {item.value}
                                            <span className="text-sm font-normal text-gray-500 ml-1">
                                              {item.unit}
                                            </span>
                                          </p>
                                        </div>
                                        <item.icon
                                          className={`w-8 h-8 text-${item.color}-500`}
                                        />
                                      </div>
                                    </CardContent>
                                  </Card>
                                </motion.div>
                              ))}
                            </div>

                            <Separator className="my-8" />

                            {/* Ball Size Distribution */}
                            <div className="space-y-6">
                              <div className="text-center">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                  توزیع اندازه گلوله‌های پیشنهادی
                                </h3>
                                <Badge
                                  variant="secondary"
                                  className="text-lg px-4 py-2"
                                >
                                  {results.distributionName}
                                </Badge>
                              </div>

                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Bar Chart */}
                                <Card className="p-6">
                                  <h4 className="text-lg font-semibold mb-4 text-center">
                                    نمودار ستونی توزیع
                                  </h4>
                                  <ResponsiveContainer
                                    width="100%"
                                    height={300}
                                  >
                                    <BarChart
                                      data={
                                        results.distributionChartData
                                      }
                                    >
                                      <CartesianGrid strokeDasharray="3 3" />
                                      <XAxis dataKey="size" />
                                      <YAxis />
                                      <RechartsTooltip
                                        formatter={(value) => [
                                          `${value}%`,
                                          "درصد",
                                        ]}
                                        labelFormatter={(label) =>
                                          `اندازه: ${label}`
                                        }
                                      />
                                      <Bar
                                        dataKey="percentage"
                                        fill="#3B82F6"
                                        radius={[4, 4, 0, 0]}
                                      />
                                    </BarChart>
                                  </ResponsiveContainer>
                                </Card>

                                {/* Pie Chart */}
                                <Card className="p-6">
                                  <h4 className="text-lg font-semibold mb-4 text-center">
                                    نمودار دایره‌ای توزیع
                                  </h4>
                                  <ResponsiveContainer
                                    width="100%"
                                    height={300}
                                  >
                                    <PieChart>
                                      <Pie
                                        data={
                                          results.distributionChartData
                                        }
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="percentage"
                                        label={({
                                          size,
                                          percentage,
                                        }) =>
                                          `${size}: ${percentage}%`
                                        }
                                      >
                                        {results.distributionChartData.map(
                                          (entry, index) => (
                                            <Cell
                                              key={`cell-${index}`}
                                              fill={
                                                COLORS[
                                                  index %
                                                    COLORS.length
                                                ]
                                              }
                                            />
                                          ),
                                        )}
                                      </Pie>
                                      <RechartsTooltip
                                        formatter={(value) => [
                                          `${value}%`,
                                          "درصد",
                                        ]}
                                        labelFormatter={(label) =>
                                          `اندازه: ${label}`
                                        }
                                      />
                                    </PieChart>
                                  </ResponsiveContainer>
                                </Card>
                              </div>

                              {/* Enhanced Ball Size Grid */}
                              <Card className="p-6">
                                <h4 className="text-lg font-semibold mb-4">
                                  جدول توزیع اندازه گلوله‌ها
                                </h4>
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                                  {results.distributionChartData.map(
                                    (item, index) => (
                                      <motion.div
                                        key={index}
                                        initial={{
                                          opacity: 0,
                                          scale: 0.8,
                                        }}
                                        animate={{
                                          opacity: 1,
                                          scale: 1,
                                        }}
                                        transition={{
                                          delay: index * 0.05,
                                        }}
                                        className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white p-4 rounded-lg text-center shadow-md hover:shadow-lg transition-shadow"
                                      >
                                        <div className="text-lg font-bold">
                                          {item.percentage}%
                                        </div>
                                        <div className="text-xs opacity-80">
                                          {item.ballSize}mm
                                        </div>
                                        <div className="text-xs opacity-60">
                                          گلوله {index + 1}
                                        </div>
                                      </motion.div>
                                    ),
                                  )}
                                </div>
                                
                                {/* Enhanced Ball Calculation Summary */}
                                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                                  <div className="p-4 bg-blue-50 rounded-lg">
                                    <h5 className="font-semibold text-blue-800 mb-2">روش Bond</h5>
                                    <div className="text-2xl font-bold text-blue-600">{results.bondBallSize}mm</div>
                                    <div className="text-xs text-blue-600">معادله کلاسیک</div>
                                  </div>
                                  
                                  <div className="p-4 bg-green-50 rounded-lg">
                                    <h5 className="font-semibold text-green-800 mb-2">روش Morrell</h5>
                                    <div className="text-2xl font-bold text-green-600">{results.morellBallSize}mm</div>
                                    <div className="text-xs text-green-600">مدل C</div>
                                  </div>
                                  
                                  <div className="p-4 bg-purple-50 rounded-lg">
                                    <h5 className="font-semibold text-purple-800 mb-2">روش Austin</h5>
                                    <div className="text-2xl font-bold text-purple-600">{results.austinBallSize}mm</div>
                                    <div className="text-xs text-purple-600">اصلاح انرژی ویژه</div>
                                  </div>
                                </div>
                              </Card>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ) : (
                      <div className="flex-1 flex items-center justify-center">
                        <div className="text-center p-8 max-w-md mx-auto">
                          <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            className="mb-6"
                          >
                            <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto" />
                          </motion.div>
                          <h3 className="text-xl font-semibold text-foreground mb-3">
                            هنوز محاسبه‌ای انجام نشده
                          </h3>
                          <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                            برای مشاهده نتایج تفصیلی و نمودارهای تحلیلی، ابتدا پارامترهای آسیاب را
                            وارد کرده و محاسبه را شروع کنید.
                          </p>
                          <div className="space-y-3">
                            <Button
                              onClick={() => setActiveTab("designer")}
                              className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white py-3 rounded-lg"
                            >
                              <Wand2 className="w-4 h-4 mr-2" />
                              شروع با طراح هوشمند
                            </Button>
                            <Button
                              onClick={() => setActiveTab("calculator")}
                              variant="outline"
                              className="w-full py-3 rounded-lg"
                            >
                              <ArrowRight className="w-4 h-4 mr-2" />
                              محاسبه‌گر دستی
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </AnimatePresence>
                </TabsContent>

                <TabsContent value="charging" className="flex-1 m-0 p-4 overflow-auto">
                  <EnhancedBallCharging 
                    inputs={inputs} 
                    results={results} 
                    selectedMaterial={selectedMaterial}
                  />
                </TabsContent>

                <TabsContent value="advanced" className="flex-1 m-0 p-4 overflow-auto">
                  <AdvancedCalculations inputs={inputs} results={results} />
                </TabsContent>

                <TabsContent value="report" className="flex-1 m-0 p-4 overflow-auto">
                  <ProfessionalReport 
                    inputs={inputs} 
                    results={results} 
                    selectedMaterial={selectedMaterial}
                  />
                </TabsContent>

                <TabsContent value="guide" className="flex-1 m-0 p-4 overflow-auto">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    <div className="bg-card rounded-xl shadow-lg border border-border/20 overflow-hidden">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-4">
                        <div className="flex items-center gap-3">
                          <HelpCircle className="w-6 h-6" />
                          <div>
                            <h2 className="font-bold text-lg">راهنمای استفاده</h2>
                            <p className="text-sm opacity-90">محاسبه‌گر آسیاب گلوله‌ای</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 space-y-6">
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-lg font-semibold mb-3 text-foreground">
                              درباره آسیاب گلوله‌ای صنعتی
                            </h3>
                            <div className="space-y-3 text-muted-foreground text-sm leading-relaxed">
                              <p>
                                آسیاب گلوله‌ای یکی از حیاتی‌ترین تجهیزات در صنایع معدن، سیمان، 
                                سرامیک و شیمیایی است که برای کاهش اندازه مواد جامد استفاده می‌شود.
                              </p>
                              <p>
                                این تجهیز بر اساس اصل ضربه و سایش کار می‌کند، جایی که گلوله‌های 
                                فولادی درون استوانه چرخان، مواد را خرد کرده و به اندازه مطلوب می‌رسانند.
                              </p>
                              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2 text-sm">کاربردهای صنعتی:</h4>
                                <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                                  <li>• صنایع معدن: آسیاب سنگ‌های معدنی</li>
                                  <li>• صنعت سیمان: آسیاب کلینکر و مواد اولیه</li>
                                  <li>• صنایع سرامیک: تهیه پودرهای ریز</li>
                                  <li>• صنایع شیمیایی: تولید مواد پودری</li>
                                </ul>
                              </div>
                            </div>
                            
                            <div className="bg-muted/50 rounded-lg p-3">
                              <ImageWithFallback
                                src="https://mbmmllc.com/wp-content/uploads/2020/05/BM-1.5-opt.png"
                                alt="Ball Mill BM-1.5 - Professional Industrial Equipment"
                                className="w-full h-32 object-contain bg-background rounded-lg shadow-sm"
                              />
                              <div className="text-center mt-2">
                                <p className="text-xs font-medium text-foreground">
                                  آسیاب گلوله‌ای BM-1.5
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  تجهیز حرفه‌ای صنعتی
                                </p>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-lg font-semibold mb-3 text-foreground">
                              نحوه استفاده
                            </h3>
                            <div className="space-y-3">
                              {[
                                {
                                  text: "پارامترهای مورد نیاز را در فرم وارد کنید",
                                  detail: "یا از پایگاه داده مواد استفاده کنید"
                                },
                                {
                                  text: "محاسبات پیشرفته را انجام دهید",
                                  detail: "شامل تحلیل توان، اقتصادی و ایمنی"
                                },
                                {
                                  text: "نتایج تفصیلی را بررسی کنید",
                                  detail: "نمودارها، جداول و تحلیل‌های کامل"
                                },
                                {
                                  text: "گزارش حرفه‌ای تهیه کنید",
                                  detail: "خروجی PDF، Excel و قابلیت چاپ"
                                },
                                {
                                  text: "توصیه‌های مهندسی را مطالعه کنید",
                                  detail: "بهینه‌سازی و نکات عملیاتی"
                                },
                              ].map((step, index) => (
                                <div
                                  key={index}
                                  className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg border border-border/20"
                                >
                                  <div className="w-7 h-7 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                                    {index + 1}
                                  </div>
                                  <div>
                                    <p className="text-foreground font-medium text-sm">
                                      {step.text}
                                    </p>
                                    <p className="text-muted-foreground text-xs mt-1">
                                      {step.detail}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <Separator className="my-4" />

                          <div>
                            <h3 className="text-lg font-semibold mb-4 text-foreground">
                              توضیح پارامترها
                            </h3>
                            <div className="space-y-3">
                              {Object.entries(parameterInfo).map(
                                ([key, info]) => {
                                  const IconComponent = info.icon;
                                  return (
                                    <div
                                      key={key}
                                      className="bg-background rounded-lg border border-border/20 p-3 hover:shadow-sm transition-shadow"
                                    >
                                      <div className="flex items-start gap-3">
                                        <IconComponent className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                                        <div className="flex-1">
                                          <h4 className="font-medium text-foreground text-sm mb-1">
                                            {info.name}
                                          </h4>
                                          <p className="text-xs text-muted-foreground mb-2 leading-relaxed">
                                            {info.description}
                                          </p>
                                          <div className="flex gap-4 text-xs text-muted-foreground">
                                            <span>واحد: {info.unit}</span>
                                            <span>محدوده: {info.range}</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                },
                              )}
                            </div>
                          </div>

                          <div className="space-y-3">
                            <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800 rounded-lg">
                              <HelpCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                              <AlertTitle className="text-blue-800 dark:text-blue-200 text-sm">
                                ویژگی‌های حرفه‌ای
                              </AlertTitle>
                              <AlertDescription className="text-blue-700 dark:text-blue-300 text-xs">
                                محاسبات پیشرفته Bond Work Index، تحلیل اقتصادی، 
                                ارزیابی ایمنی و گزارش‌های تخصصی مهندسی.
                              </AlertDescription>
                            </Alert>

                            <Alert className="border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800 rounded-lg">
                              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                              <AlertTitle className="text-green-800 dark:text-green-200 text-sm">
                                اعتبار علمی
                              </AlertTitle>
                              <AlertDescription className="text-green-700 dark:text-green-300 text-xs">
                                فرمول‌ها بر اساس استانداردهای بین‌المللی مهندسی معدن، 
                                کتاب‌های مرجع Bond و Rowland به‌روزرسانی شده‌اند.
                              </AlertDescription>
                            </Alert>

                            <Alert className="border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-800 rounded-lg">
                              <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                              <AlertTitle className="text-yellow-800 dark:text-yellow-200 text-sm">
                                توصیه مهندسی
                              </AlertTitle>
                              <AlertDescription className="text-yellow-700 dark:text-yellow-300 text-xs">
                                نتایج برای طراحی اولیه مناسب است. برای تصمیم‌گیری‌های نهایی 
                                با مهندسان متخصص مشورت کنید.
                              </AlertDescription>
                            </Alert>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>

        {/* Floating Action Button */}
        {!isCalculating && !results && activeTab === "calculator" && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={calculateResults}
              className="w-14 h-14 rounded-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Calculator className="w-6 h-6" />
            </Button>
          </motion.div>
        )}
      </div>
    </TooltipProvider>
  );
}