"use client"

import { useState } from "react"
import {
  Bold,
  CalendarDays,
  Check,
  ChevronDown,
  FileJson,
  Inbox,
  Italic,
  MoreHorizontal,
  Paperclip,
  Search,
  Settings,
  Sparkles,
  Underline,
} from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Attachment, AttachmentActions, AttachmentAction, AttachmentContent, AttachmentDescription, AttachmentGroup, AttachmentMedia, AttachmentTitle } from "@/components/ui/attachment"
import { Avatar, AvatarBadge, AvatarFallback, AvatarGroup, AvatarGroupCount } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Bubble, BubbleContent, BubbleGroup, BubbleReactions } from "@/components/ui/bubble"
import { Button } from "@/components/ui/button"
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "@/components/ui/button-group"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { Checkbox } from "@/components/ui/checkbox"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Combobox, ComboboxContent, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuSeparator, ContextMenuTrigger } from "@/components/ui/context-menu"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DirectionProvider } from "@/components/ui/direction"
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Input } from "@/components/ui/input"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput, InputGroupText } from "@/components/ui/input-group"
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup, ItemMedia, ItemTitle } from "@/components/ui/item"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { Label } from "@/components/ui/label"
import { Marker, MarkerContent, MarkerIcon } from "@/components/ui/marker"
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from "@/components/ui/menubar"
import { Message, MessageAvatar, MessageContent, MessageFooter, MessageGroup, MessageHeader } from "@/components/ui/message"
import { MessageScroller, MessageScrollerButton, MessageScrollerContent, MessageScrollerItem, MessageScrollerProvider, MessageScrollerViewport } from "@/components/ui/message-scroller"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"
import { Popover, PopoverContent, PopoverDescription, PopoverHeader, PopoverTitle, PopoverTrigger } from "@/components/ui/popover"
import { Progress, ProgressLabel, ProgressValue } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import { Slider } from "@/components/ui/slider"
import { Spinner } from "@/components/ui/spinner"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/toast"
import { Toggle } from "@/components/ui/toggle"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

const chartData = [
  { day: "Mon", reviews: 18 }, { day: "Tue", reviews: 28 }, { day: "Wed", reviews: 22 },
  { day: "Thu", reviews: 36 }, { day: "Fri", reviews: 31 }, { day: "Sat", reviews: 42 },
]
const chartConfig = { reviews: { label: "Reviews", color: "var(--chart-1)" } } satisfies ChartConfig
const tableRows = [
  { name: "Spring", owner: "Design", state: "Published" },
  { name: "Morning Light", owner: "Product", state: "Review" },
  { name: "Night", owner: "Platform", state: "Draft" },
]

export function ComponentPreview({ slug, compact = false }: { slug: string; compact?: boolean }) {
  const [otp, setOtp] = useState("123456")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)

  let content: React.ReactNode

  switch (slug) {
    case "accordion":
      content = <Accordion defaultValue={["tokens"]} className="w-full max-w-xl"><AccordionItem value="tokens"><AccordionTrigger>Semantic tokens</AccordionTrigger><AccordionContent>Primary, accent, status, chart, and surface tokens.</AccordionContent></AccordionItem><AccordionItem value="states"><AccordionTrigger>Component states</AccordionTrigger><AccordionContent>Hover, focus, disabled, loading, and destructive states.</AccordionContent></AccordionItem></Accordion>
      break
    case "aspect-ratio":
      content = <AspectRatio ratio={16 / 9} className="grid w-full max-w-lg place-items-center rounded-lg bg-muted text-sm text-muted-foreground">16:9 preview surface</AspectRatio>
      break
    case "avatar":
      content = <AvatarGroup><Avatar><AvatarFallback>TL</AvatarFallback><AvatarBadge /></Avatar><Avatar><AvatarFallback>DS</AvatarFallback></Avatar><Avatar><AvatarFallback>UI</AvatarFallback></Avatar><AvatarGroupCount>+8</AvatarGroupCount></AvatarGroup>
      break
    case "badge":
      content = <><Badge>Default</Badge><Badge variant="secondary">Preview</Badge><Badge variant="outline">v1.0</Badge><Badge variant="destructive">Blocked</Badge></>
      break
    case "button":
      content = <><Button>Primary</Button><Button variant="secondary">Secondary</Button><Button variant="outline">Outline</Button><Button variant="destructive">Delete</Button><Button variant="ghost" size="icon" aria-label="More actions"><MoreHorizontal /></Button></>
      break
    case "button-group":
      content = <ButtonGroup><Button variant="outline">Preview</Button><ButtonGroupSeparator /><Button variant="outline">Code</Button><ButtonGroupText>v1.0</ButtonGroupText></ButtonGroup>
      break
    case "card":
      content = <Card className="w-full max-w-sm"><CardHeader><CardTitle>Theme health</CardTitle><CardDescription>Shared semantic token status</CardDescription><CardAction><Button variant="ghost" size="icon-sm" aria-label="Card actions"><MoreHorizontal /></Button></CardAction></CardHeader><CardContent><Progress value={96}><ProgressLabel>Coverage</ProgressLabel><ProgressValue /></Progress></CardContent><CardFooter><Badge variant="secondary">Ready</Badge></CardFooter></Card>
      break
    case "collapsible":
      content = <Collapsible defaultOpen className="w-full max-w-lg rounded-lg border p-3"><div className="flex items-center justify-between"><strong className="text-sm">Advanced tokens</strong><CollapsibleTrigger render={<Button variant="ghost" size="icon-sm" />}><ChevronDown /></CollapsibleTrigger></div><CollapsibleContent className="pt-3 text-sm text-muted-foreground">Elevation, overlay, chart, and sidebar values.</CollapsibleContent></Collapsible>
      break
    case "kbd":
      content = <div className="flex items-center gap-2 text-sm text-muted-foreground">Open search <KbdGroup><Kbd>⌘</Kbd><Kbd>K</Kbd></KbdGroup></div>
      break
    case "separator":
      content = <div className="w-full max-w-xl text-sm"><p>Interface section</p><Separator className="my-4" /><p className="text-muted-foreground">Semantic tokens keep hierarchy quiet.</p></div>
      break
    case "typography":
      content = <div className="max-w-xl"><h2 className="text-2xl font-semibold">Component typography</h2><p className="mt-2 leading-7 text-muted-foreground">A restrained type scale for dense product interfaces and multilingual content.</p><blockquote className="mt-4 border-l-2 border-primary pl-4 text-sm">Tokens should describe intent, not a single palette.</blockquote><code className="mt-4 block text-xs text-primary">var(--color-primary)</code></div>
      break
    case "checkbox":
      content = <div className="grid gap-3"><label className="flex items-center gap-2 text-sm"><Checkbox defaultChecked /> Include hover states</label><label className="flex items-center gap-2 text-sm"><Checkbox /> Include disabled states</label><label className="flex items-center gap-2 text-sm text-muted-foreground"><Checkbox disabled /> Locked by policy</label></div>
      break
    case "combobox":
      content = <Combobox items={["Spring", "Morning Light", "Sunshine", "Dusk", "Night"]}><ComboboxInput placeholder="Search themes" /><ComboboxContent><ComboboxList>{["Spring", "Morning Light", "Sunshine", "Dusk", "Night"].map((item) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>)}</ComboboxList></ComboboxContent></Combobox>
      break
    case "date-picker":
      content = <Popover><PopoverTrigger render={<Button variant="outline" />}><CalendarDays /> August 1, 2026</PopoverTrigger><PopoverContent className="w-auto p-0"><Calendar mode="single" defaultMonth={new Date(2026, 7, 1)} selected={new Date(2026, 7, 1)} /></PopoverContent></Popover>
      break
    case "field":
      content = <FieldGroup className="max-w-md"><Field><FieldLabel htmlFor="theme-name">Theme name</FieldLabel><Input id="theme-name" defaultValue="Spring" /><FieldDescription>Shown in both component catalogs.</FieldDescription></Field><Field data-invalid="true"><FieldLabel htmlFor="theme-id">Theme ID</FieldLabel><Input id="theme-id" aria-invalid defaultValue="spring light" /><FieldError>Use lowercase letters without spaces.</FieldError></Field></FieldGroup>
      break
    case "input":
      content = <div className="grid w-full max-w-md gap-3"><Input placeholder="Component name" /><Input defaultValue="Read-only token" readOnly /><Input placeholder="Disabled" disabled /></div>
      break
    case "input-group":
      content = <InputGroup className="max-w-md"><InputGroupAddon><Search /><InputGroupText>Find</InputGroupText></InputGroupAddon><InputGroupInput placeholder="Search 63 components" /><InputGroupAddon align="inline-end"><InputGroupButton aria-label="Search"><Check /></InputGroupButton></InputGroupAddon></InputGroup>
      break
    case "input-otp":
      content = <InputOTP maxLength={6} value={otp} onChange={setOtp}><InputOTPGroup>{[0, 1, 2].map((index) => <InputOTPSlot key={index} index={index} />)}</InputOTPGroup><InputOTPSeparator /><InputOTPGroup>{[3, 4, 5].map((index) => <InputOTPSlot key={index} index={index} />)}</InputOTPGroup></InputOTP>
      break
    case "label":
      content = <div className="grid w-full max-w-sm gap-2"><Label htmlFor="label-demo">Component label</Label><Input id="label-demo" placeholder="Enter a label" /></div>
      break
    case "native-select":
      content = <NativeSelect defaultValue="spring"><NativeSelectOption value="spring">Spring</NativeSelectOption><NativeSelectOption value="sunshine">Sunshine</NativeSelectOption><NativeSelectOption value="night">Night</NativeSelectOption></NativeSelect>
      break
    case "radio-group":
      content = <RadioGroup defaultValue="vue" className="max-w-sm"><label className="flex items-center gap-2 text-sm"><RadioGroupItem value="vue" /> Vue catalog</label><label className="flex items-center gap-2 text-sm"><RadioGroupItem value="react" /> React catalog</label><label className="flex items-center gap-2 text-sm"><RadioGroupItem value="both" /> Both frameworks</label></RadioGroup>
      break
    case "select":
      content = <Select defaultValue="spring"><SelectTrigger className="w-56"><SelectValue placeholder="Select theme" /></SelectTrigger><SelectContent><SelectItem value="spring">Spring</SelectItem><SelectItem value="morning">Morning Light</SelectItem><SelectItem value="night">Night</SelectItem></SelectContent></Select>
      break
    case "slider":
      content = <div className="w-full max-w-lg"><div className="mb-3 flex justify-between text-sm"><span>Preview scale</span><span className="text-muted-foreground">64%</span></div><Slider defaultValue={[64]} /></div>
      break
    case "switch":
      content = <div className="grid gap-3"><label className="flex items-center justify-between gap-8 text-sm">Live preview <Switch defaultChecked /></label><label className="flex items-center justify-between gap-8 text-sm">Reduced motion <Switch /></label></div>
      break
    case "textarea":
      content = <div className="grid w-full max-w-lg gap-2"><Label htmlFor="notes">Review notes</Label><Textarea id="notes" defaultValue="Check contrast, focus visibility, and compact layouts." rows={4} /></div>
      break
    case "toggle":
      content = <><Toggle aria-label="Toggle bold" variant="outline"><Bold /></Toggle><Toggle aria-label="Toggle italic" variant="outline"><Italic /></Toggle><Toggle aria-label="Toggle underline" variant="outline"><Underline /></Toggle></>
      break
    case "toggle-group":
      content = <ToggleGroup defaultValue={["preview"]} variant="outline" spacing={0}><ToggleGroupItem value="preview">Preview</ToggleGroupItem><ToggleGroupItem value="tokens">Tokens</ToggleGroupItem><ToggleGroupItem value="code">Code</ToggleGroupItem></ToggleGroup>
      break
    case "calendar":
      content = <Calendar mode="single" defaultMonth={new Date(2026, 7, 1)} selected={new Date(2026, 7, 1)} className="rounded-lg border" />
      break
    case "carousel":
      content = <Carousel className="w-full max-w-md"><CarouselContent>{["Spring", "Sunshine", "Night"].map((name) => <CarouselItem key={name}><div className="grid h-44 place-items-center rounded-lg bg-accent text-lg font-semibold text-accent-foreground">{name}</div></CarouselItem>)}</CarouselContent><CarouselPrevious /><CarouselNext /></Carousel>
      break
    case "chart":
      content = <ChartContainer config={chartConfig} className="h-64 w-full max-w-xl"><BarChart data={chartData}><CartesianGrid vertical={false} /><XAxis dataKey="day" tickLine={false} axisLine={false} /><ChartTooltip content={<ChartTooltipContent />} /><Bar dataKey="reviews" fill="var(--color-reviews)" radius={[4, 4, 0, 0]} /></BarChart></ChartContainer>
      break
    case "data-table":
    case "table":
      content = <Table><TableHeader><TableRow><TableHead>Theme</TableHead><TableHead>Owner</TableHead><TableHead>Status</TableHead></TableRow></TableHeader><TableBody>{tableRows.map((row) => <TableRow key={row.name}><TableCell className="font-medium">{row.name}</TableCell><TableCell>{row.owner}</TableCell><TableCell><Badge variant={row.state === "Published" ? "secondary" : "outline"}>{row.state}</Badge></TableCell></TableRow>)}</TableBody></Table>
      break
    case "empty":
      content = <Empty className="border"><EmptyHeader><EmptyMedia variant="icon"><Inbox /></EmptyMedia><EmptyTitle>No saved states</EmptyTitle><EmptyDescription>Create a component state to compare it across themes.</EmptyDescription></EmptyHeader><EmptyContent><Button>Create state</Button></EmptyContent></Empty>
      break
    case "item":
      content = <ItemGroup className="max-w-xl">{[{ icon: Sparkles, name: "Semantic palette", note: "42 mapped tokens" }, { icon: Settings, name: "Component defaults", note: "63 previews" }].map(({ icon: Icon, name, note }) => <Item key={name} variant="outline"><ItemMedia variant="icon"><Icon /></ItemMedia><ItemContent><ItemTitle>{name}</ItemTitle><ItemDescription>{note}</ItemDescription></ItemContent><ItemActions><Button variant="ghost" size="icon-sm" aria-label="Item actions"><MoreHorizontal /></Button></ItemActions></Item>)}</ItemGroup>
      break
    case "progress":
      content = <Progress value={82} className="w-full max-w-lg"><ProgressLabel>Catalog coverage</ProgressLabel><ProgressValue /></Progress>
      break
    case "resizable":
      content = <ResizablePanelGroup orientation="horizontal" className="h-52 w-full max-w-2xl overflow-hidden rounded-lg border"><ResizablePanel defaultSize={35}><div className="grid h-full place-items-center bg-muted text-sm">Navigation</div></ResizablePanel><ResizableHandle withHandle /><ResizablePanel><div className="grid h-full place-items-center text-sm">Preview inspector</div></ResizablePanel></ResizablePanelGroup>
      break
    case "scroll-area":
      content = <ScrollArea className="h-52 w-full max-w-md rounded-lg border"><div className="p-3">{Array.from({ length: 14 }, (_, index) => <div key={index} className="border-b py-2 text-sm">Component row {String(index + 1).padStart(2, "0")}</div>)}</div></ScrollArea>
      break
    case "skeleton":
      content = <div className="flex w-full max-w-lg gap-3"><Skeleton className="size-12 rounded-full" /><div className="flex-1 space-y-2"><Skeleton className="h-4 w-2/5" /><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-4/5" /></div></div>
      break
    case "spinner":
      content = <><Spinner className="size-4" /><Spinner className="size-6 text-primary" /><Button disabled><Spinner /> Compiling</Button></>
      break
    case "breadcrumb":
      content = <Breadcrumb><BreadcrumbList><BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbLink href="/components">Components</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>Breadcrumb</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb>
      break
    case "command":
      content = <Command className="w-full max-w-md rounded-lg border"><CommandInput placeholder="Search components..." /><CommandList><CommandEmpty>No results.</CommandEmpty><CommandGroup heading="Suggestions"><CommandItem><Search /> Component search</CommandItem><CommandItem><Sparkles /> Theme tokens</CommandItem><CommandItem><Settings /> Workspace settings</CommandItem></CommandGroup></CommandList></Command>
      break
    case "direction":
      content = <div className="grid w-full max-w-lg grid-cols-2 gap-3"><DirectionProvider direction="ltr"><div className="rounded-lg border p-4 text-sm">LTR · Theme settings</div></DirectionProvider><DirectionProvider direction="rtl"><div className="rounded-lg border p-4 text-sm">RTL · إعدادات السمة</div></DirectionProvider></div>
      break
    case "dropdown-menu":
      content = <DropdownMenu><DropdownMenuTrigger render={<Button variant="outline" />}>Theme actions <ChevronDown /></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuLabel>Theme</DropdownMenuLabel><DropdownMenuItem>Rename</DropdownMenuItem><DropdownMenuItem>Duplicate</DropdownMenuItem><DropdownMenuSeparator /><DropdownMenuItem variant="destructive">Archive</DropdownMenuItem></DropdownMenuContent></DropdownMenu>
      break
    case "menubar":
      content = <Menubar><MenubarMenu><MenubarTrigger>File</MenubarTrigger><MenubarContent><MenubarItem>New theme <MenubarShortcut>⌘N</MenubarShortcut></MenubarItem><MenubarItem>Open <MenubarShortcut>⌘O</MenubarShortcut></MenubarItem><MenubarSeparator /><MenubarItem>Export</MenubarItem></MenubarContent></MenubarMenu><MenubarMenu><MenubarTrigger>View</MenubarTrigger><MenubarContent><MenubarItem>Preview</MenubarItem><MenubarItem>Tokens</MenubarItem></MenubarContent></MenubarMenu></Menubar>
      break
    case "navigation-menu":
      content = <NavigationMenu><NavigationMenuList><NavigationMenuItem><NavigationMenuLink href="#overview">Overview</NavigationMenuLink></NavigationMenuItem><NavigationMenuItem><NavigationMenuLink href="#components">Components</NavigationMenuLink></NavigationMenuItem><NavigationMenuItem><NavigationMenuLink href="#themes">Themes</NavigationMenuLink></NavigationMenuItem></NavigationMenuList></NavigationMenu>
      break
    case "pagination":
      content = <Pagination><PaginationContent><PaginationItem><PaginationPrevious href="#" /></PaginationItem><PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem><PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem><PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem><PaginationItem><PaginationEllipsis /></PaginationItem><PaginationItem><PaginationNext href="#" /></PaginationItem></PaginationContent></Pagination>
      break
    case "sidebar":
      content = <SidebarProvider defaultOpen className="min-h-0 w-full max-w-2xl overflow-hidden rounded-lg border"><Sidebar collapsible="none" className="relative h-64 w-56"><SidebarHeader className="border-b p-3 font-semibold">Theme Lab</SidebarHeader><SidebarContent><SidebarGroup><SidebarGroupLabel>Workspace</SidebarGroupLabel><SidebarGroupContent><SidebarMenu>{["Overview", "Components", "Themes"].map((item, index) => <SidebarMenuItem key={item}><SidebarMenuButton isActive={index === 0}><Sparkles /> {item}</SidebarMenuButton></SidebarMenuItem>)}</SidebarMenu></SidebarGroupContent></SidebarGroup></SidebarContent></Sidebar><div className="grid flex-1 place-items-center bg-background text-sm text-muted-foreground">Content surface</div></SidebarProvider>
      break
    case "tabs":
      content = <Tabs defaultValue="preview" className="w-full max-w-xl"><TabsList><TabsTrigger value="preview">Preview</TabsTrigger><TabsTrigger value="tokens">Tokens</TabsTrigger><TabsTrigger value="a11y">Accessibility</TabsTrigger></TabsList><TabsContent value="preview" className="rounded-lg border p-4">Live component surface</TabsContent><TabsContent value="tokens" className="rounded-lg border p-4">Semantic token mapping</TabsContent><TabsContent value="a11y" className="rounded-lg border p-4">Keyboard and contrast notes</TabsContent></Tabs>
      break
    case "alert-dialog":
      content = <><Button variant="destructive" onClick={() => setAlertOpen(true)}>Archive theme</Button><AlertDialog open={alertOpen} onOpenChange={setAlertOpen}><AlertDialogContent><AlertDialogHeader><AlertDialogTitle>Archive this theme?</AlertDialogTitle><AlertDialogDescription>The theme will remain in history but disappear from the active catalog.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={() => setAlertOpen(false)}>Archive</AlertDialogAction></AlertDialogFooter></AlertDialogContent></AlertDialog></>
      break
    case "context-menu":
      content = <ContextMenu><ContextMenuTrigger className="grid h-44 w-full max-w-lg place-items-center rounded-lg border border-dashed text-sm text-muted-foreground">Right-click this preview surface</ContextMenuTrigger><ContextMenuContent><ContextMenuItem>Inspect token</ContextMenuItem><ContextMenuItem>Copy component path</ContextMenuItem><ContextMenuSeparator /><ContextMenuItem variant="destructive">Reset state</ContextMenuItem></ContextMenuContent></ContextMenu>
      break
    case "dialog":
      content = <><Button onClick={() => setDialogOpen(true)}>Open dialog</Button><Dialog open={dialogOpen} onOpenChange={setDialogOpen}><DialogContent><DialogHeader><DialogTitle>Publish theme</DialogTitle><DialogDescription>Publish Spring to the shared component catalog?</DialogDescription></DialogHeader><DialogFooter showCloseButton><Button onClick={() => setDialogOpen(false)}>Publish</Button></DialogFooter></DialogContent></Dialog></>
      break
    case "drawer":
      content = <><Button onClick={() => setDrawerOpen(true)}>Open drawer</Button><Drawer open={drawerOpen} onOpenChange={setDrawerOpen} showSwipeHandle><DrawerContent><DrawerHeader><DrawerTitle>Token inspector</DrawerTitle><DrawerDescription>Adjust the semantic preview values.</DrawerDescription></DrawerHeader><div className="grid gap-4 p-4"><Label>Preview scale</Label><Slider defaultValue={[64]} /></div><DrawerFooter><Button onClick={() => setDrawerOpen(false)}>Apply</Button></DrawerFooter></DrawerContent></Drawer></>
      break
    case "hover-card":
      content = <HoverCard><HoverCardTrigger render={<Button variant="link" />}>@theme-lab</HoverCardTrigger><HoverCardContent><div className="flex gap-3"><Avatar><AvatarFallback>TL</AvatarFallback></Avatar><div><strong className="text-sm">Theme Lab</strong><p className="mt-1 text-sm text-muted-foreground">63 shadcn components · 5 themes</p></div></div></HoverCardContent></HoverCard>
      break
    case "popover":
      content = <Popover><PopoverTrigger render={<Button variant="outline" />}>Inspect token</PopoverTrigger><PopoverContent><PopoverHeader><PopoverTitle>Primary</PopoverTitle><PopoverDescription>Semantic action color in the current theme.</PopoverDescription></PopoverHeader><code className="text-xs text-primary">oklch(var(--primary))</code></PopoverContent></Popover>
      break
    case "sheet":
      content = <><Button onClick={() => setSheetOpen(true)}>Open inspector</Button><Sheet open={sheetOpen} onOpenChange={setSheetOpen}><SheetContent><SheetHeader><SheetTitle>Component inspector</SheetTitle><SheetDescription>Review semantic variables and interactive states.</SheetDescription></SheetHeader><div className="grid gap-4 p-4"><Field><FieldLabel>Component name</FieldLabel><Input defaultValue="Button" /></Field><Field><FieldLabel>Theme</FieldLabel><NativeSelect defaultValue="spring"><NativeSelectOption value="spring">Spring</NativeSelectOption><NativeSelectOption value="night">Night</NativeSelectOption></NativeSelect></Field></div><SheetFooter><Button onClick={() => setSheetOpen(false)}>Done</Button></SheetFooter></SheetContent></Sheet></>
      break
    case "tooltip":
      content = <Tooltip><TooltipTrigger render={<Button variant="outline" size="icon" aria-label="Component settings" />}><Settings /></TooltipTrigger><TooltipContent>Component settings</TooltipContent></Tooltip>
      break
    case "alert":
      content = <div className="grid w-full max-w-xl gap-3"><Alert><Check /><AlertTitle>Catalog complete</AlertTitle><AlertDescription>All 63 component routes have a preview definition.</AlertDescription></Alert><Alert className="border-[var(--warning)]"><Sparkles /><AlertTitle>Contrast review</AlertTitle><AlertDescription>Two combinations are close to the review threshold.</AlertDescription></Alert></div>
      break
    case "toast":
      content = <Button onClick={() => toast.add({ title: "Theme published", description: "Shared tokens are now available.", type: "success" })}>Show toast</Button>
      break
    case "attachment":
      content = <AttachmentGroup><Attachment><AttachmentMedia><FileJson /></AttachmentMedia><AttachmentContent><AttachmentTitle>theme-tokens.json</AttachmentTitle><AttachmentDescription>18 KB · Ready</AttachmentDescription></AttachmentContent><AttachmentActions><AttachmentAction aria-label="Attachment actions"><MoreHorizontal /></AttachmentAction></AttachmentActions></Attachment><Attachment state="uploading"><AttachmentMedia><Paperclip /></AttachmentMedia><AttachmentContent><AttachmentTitle>component-states.zip</AttachmentTitle><AttachmentDescription>Uploading · 64%</AttachmentDescription></AttachmentContent></Attachment></AttachmentGroup>
      break
    case "bubble":
      content = <BubbleGroup className="w-full max-w-xl"><Bubble variant="secondary"><BubbleContent>Compare the Spring and Night button states.</BubbleContent></Bubble><Bubble align="end"><BubbleContent>Both themes keep focus and destructive intent clear.</BubbleContent><BubbleReactions>✓ 3</BubbleReactions></Bubble></BubbleGroup>
      break
    case "marker":
      content = <div className="grid w-full max-w-xl gap-5"><Marker variant="separator"><MarkerIcon><Sparkles /></MarkerIcon><MarkerContent>New theme session</MarkerContent></Marker><Marker variant="border"><MarkerIcon><Check /></MarkerIcon><MarkerContent>63 component previews validated</MarkerContent></Marker></div>
      break
    case "message":
      content = <MessageGroup className="w-full max-w-xl"><Message><MessageAvatar><Avatar><AvatarFallback>AI</AvatarFallback></Avatar></MessageAvatar><MessageContent><MessageHeader>Theme assistant</MessageHeader><Bubble variant="secondary"><BubbleContent>The primary token meets the target contrast in four themes.</BubbleContent></Bubble><MessageFooter>Just now</MessageFooter></MessageContent></Message><Message align="end"><MessageAvatar><Avatar><AvatarFallback>YO</AvatarFallback></Avatar></MessageAvatar><MessageContent><Bubble><BubbleContent>Open the Dusk comparison.</BubbleContent></Bubble><MessageFooter>You · Just now</MessageFooter></MessageContent></Message></MessageGroup>
      break
    case "message-scroller":
      content = <MessageScrollerProvider><MessageScroller className="h-64 w-full max-w-xl rounded-lg border"><MessageScrollerViewport><MessageScrollerContent className="p-4">{Array.from({ length: 7 }, (_, index) => <MessageScrollerItem key={index}><Bubble align={index % 2 ? "end" : "start"} variant={index % 2 ? "default" : "secondary"}><BubbleContent>{index % 2 ? "Apply that theme to the preview." : `Theme review update ${index + 1}`}</BubbleContent></Bubble></MessageScrollerItem>)}</MessageScrollerContent></MessageScrollerViewport><MessageScrollerButton /></MessageScroller></MessageScrollerProvider>
      break
    default:
      content = <Alert><Sparkles /><AlertTitle>Preview ready</AlertTitle><AlertDescription>This component inherits the active semantic theme.</AlertDescription></Alert>
  }

  return <div className={`component-preview${compact ? " is-compact" : ""}`}>{content}</div>
}
