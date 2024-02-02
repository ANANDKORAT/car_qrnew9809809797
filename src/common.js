const productsArray= [
    {
        id:1,
        image:'https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/productimage/2021/4/2/79b298af-ec10-4269-a6e3-285c3e48951b1617339591036-1.jpg',
        title:'Sera',
        description:'Printed Tie-Up Shrug',
        price:579,
        rating:4.3,
        discount:60
    },
    {
        id:2,
        image:'https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/13997466/2021/4/27/816814eb-b46f-48a8-9bea-f6a2e36c3ab61619526440381-Sera-Women-Red--Teal-Floral-Printed-Tie-Up-Shrug-34916195264-1.jpg',
        title:'Sera',
        description:'Floral Printed Tie-Up Shrug',
        price:579,
        rating:4.3,
        discount:60
    },
    {
        id:3,
        image:'https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/17811470/2022/4/8/f73061d8-9bbf-44a2-9ea4-4db319c3299a1649403319814SeraWomenBlueShrug1.jpg',
        title:'Sera',
        description:'Women Printed Tie-Up Shrug',
        price:579,
        rating:4.3,
        discount:60
    },
    {
        id:4,
        image:'https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/productimage/2019/5/13/b6f18498-eac4-46e6-be5c-33160f28ad4f1557732655430-1.jpg',
        title:'Sera',
        description:'Printed Tie-Up Shrug',
        price:579,
        rating:4.3,
        discount:60
    },
    {
        id:5,
        image:'https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/18057290/2022/4/27/87353c98-58f7-40ab-84e1-2764066710c91651062716577SeraWomenBlueShrug1.jpg',
        title:'Sera',
        description:'Women Printed Shrug',
        price:519,
        rating:4.4,
        discount:60
    },
    {
        id:6,
        image:'https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/17811440/2022/4/8/46dc35c9-171b-49bc-82bd-09cc0e54d25d1649401443825SeraWomenWhiteShrug1.jpg',
        title:'Sera',
        description:'Women Printed Tie-Up Shrug',
        price:597,
        rating:4.2,
        discount:60
    },
    {
        id:7,
        image:'https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/20386866/2022/10/13/ce67f0ab-d6e3-4544-ba2d-388fa68cb4321665669664756SeraWomenBrownPinkPrintedLonglineTropicalTie-UpShrug1.jpg',
        title:'Sera',
        description:'Women Printed Tie-Up Shrug',
        price:579,
        rating:4.3,
        discount:60
    },
    {
        id:8,
        image:'https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/18360216/2022/5/20/6eb135fc-0239-4dc6-906d-355af2905f5a1653060802922SeraWomenCoralShrug1.jpg',
        title:'Sera',
        description:'Women Printed Tie-Up Shrug',
        price:519,
        rating:4.4,
        discount:60
    },
    {
        id:9,
        image:'https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/13997444/2021/4/27/8faed82a-ddfc-4634-95d7-cce9dd8365021619527205837-Sera-Women-Red--White-Printed-Tie-Up-Shrug-241619527205179-1.jpg',
        title:'Sera',
        description:'Printed Tie-Up Shrug',
        price:597,
        rating:4.2,
        discount:60
    },
    {
        id:10,
        image:'https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/20445898/2022/10/18/747d786f-98a7-48a4-8142-4fba445c7a051666117268125SeraWomenGreenPrintedLonglineBohemianTie-UpShrug1.jpg',
        title:'Sera',
        description:'Women Printed Tie-Up Shrug',
        price:757,
        rating:3.2,
        discount:60
    },
    {
        id:11,
        image:'https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/24510218/2023/8/16/f3cebfef-2c21-4c25-90d8-2318917ec8e81692173774264Shrug1.jpg',
        title:'Sera',
        description:'Crop Tie-Up Shrug',
        price:519,
        rating:4.0,
        discount:60
    },
    {
        id:12,
        image:'https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/22200330/2023/3/2/9e76a62a-e357-4842-9786-8d04894e47d01677761687838Shrug1.jpg',
        title:'Sera',
        description:'Printed Tie-Up Shrug',
        price:719,
        rating:4.5,
        discount:60
    },
    {
        id:13,
        image:'https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/23211794/2023/5/16/545bb76d-87f4-41c0-837e-dca2344457d31684217422688Shrug1.jpg',
        title:'Sera',
        description:'Printed Tie-Up Shrug',
        price:519,
        rating:4.1,
        discount:60
    },
    {
        id:14,
        image:'https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/22242680/2023/3/6/f07e8b83-1aec-4aa5-a9b4-e4802d7841c91678105617634SeraWomenMauveWhitePrintedCropTie-UpShrug1.jpg',
        title:'Sera',
        description:'Printed Tie-Up Shrug',
        price:519,
        rating:4.3,
        discount:60
    },
    {
        id:15,
        image:'https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/25708632/2023/11/1/30e5d4fb-aaa9-473b-ab0c-9dbc8d08690f1698813384130Shrug1.jpg',
        title:'Sera',
        description:'Floral Printed Crop Shrug',
        price:639,
        rating:4.3,
        discount:60
    },
    {
        id:16,
        image:'https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/22185416/2023/3/1/c8065705-6fd4-488e-b52a-b5d529cf88d71677685136826SeraWomenNavyBlueCropTie-UpShrug1.jpg',
        title:'Sera',
        description:'Women Tie-Up Shrug',
        price:519,
        rating:3.7,
        discount:60
    },
    {
        id:17,
        image:'https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/24369338/2023/8/7/9cbee2e5-887c-4e17-b1a2-a59e3b81b03c1691379207231Shrug1.jpg',
        title:'Sera',
        description:'Printed Bohemian Crop Shrug',
        price:759,
        rating:4.3,
        discount:60
    },
    {
        id:18,
        image:'https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/22200328/2023/3/2/7d43dbe3-9701-40ba-aab6-16dc57783a2a1677761699857Shrug1.jpg',
        title:'Sera',
        description:'Printed Tie-Up Shrug',
        price:719,
        rating:3.5,
        discount:60
    },
    {
        id:19,
        image:'https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/22242668/2023/3/6/4942432f-0704-4209-b0c5-76dee7a3c1d01678105613176SeraWomenBlackWhitePrintedCropShrug1.jpg',
        title:'Sera',
        description:'Printed Crop Open Front Shrug',
        price:639,
        rating:4.2,
        discount:60
    },{
        id:20,
        image:'https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/24510220/2023/8/16/cfa0bdec-d33f-4868-9fc3-2b1553e6a23c1692173779809Shrug1.jpg',
        title:'Sera',
        description:'Printed Crop Tie-Up Shrug',
        price:519,
        rating:4.3,
        discount:60
    },
];

const singleData = [
    {
        id: 1,
        images: [
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/productimage/2021/4/2/79b298af-ec10-4269-a6e3-285c3e48951b1617339591036-1.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/productimage/2021/4/2/ca63921c-d872-4bf0-b920-e968622eb9e51617339591075-3.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/productimage/2021/4/2/0098d389-7265-497e-8ab1-ccecdead40581617339591096-4.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/productimage/2021/4/2/a9fe3589-f59b-4669-8f61-ea02baa7e11b1617339591116-5.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/productimage/2021/4/2/185c1c35-6eb4-4a72-b333-cc8cc92119331617339591135-6.jpg'
        ],
        title: 'Sera Women Multicoloured  Printed Tie-Up Shrug',
        price: 597,
        discount: 60,
        size: ['M', 'S', 'L', 'XL'],
        rating: 4.3,
    },
    {
        id: 2,
        images: [
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/13997466/2021/4/27/816814eb-b46f-48a8-9bea-f6a2e36c3ab61619526440381-Sera-Women-Red--Teal-Floral-Printed-Tie-Up-Shrug-34916195264-1.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/13997466/2021/4/27/2fe0c07b-402c-4762-9456-a840a755dc301619526440360-Sera-Women-Red--Teal-Floral-Printed-Tie-Up-Shrug-34916195264-2.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/13997466/2021/4/27/3a919140-4edf-436a-8a88-805c14e921e41619526440335-Sera-Women-Red--Teal-Floral-Printed-Tie-Up-Shrug-34916195264-3.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/13997466/2021/4/27/6f69aa4d-96f4-4ea9-8a36-5e1439c4dfe91619526440292-Sera-Women-Red--Teal-Floral-Printed-Tie-Up-Shrug-34916195264-5.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/13997466/2021/4/27/e2f738bf-089f-4f53-9187-e3cabbfb50861619526440313-Sera-Women-Red--Teal-Floral-Printed-Tie-Up-Shrug-34916195264-4.jpg'
        ],
        title: 'Sera Women Red & Teal Floral Printed Tie-Up Shrug',
        price: 597,
        discount: 60,
        size: ['M', 'S', 'L', 'XL'],
        rating: 4.3,
    },
    {
        id: 3,
        images: [
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/17811470/2022/4/8/f73061d8-9bbf-44a2-9ea4-4db319c3299a1649403319814SeraWomenBlueShrug1.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/17811470/2022/4/8/abca42da-ea55-4531-b0e6-82ebedda7ced1649403319797SeraWomenBlueShrug2.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/17811470/2022/4/8/cb7408bc-e1dc-4169-a223-7fb3007fbd601649403319822SeraWomenBlueShrug3.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/17811470/2022/4/8/6a8ea587-18eb-4d66-9e75-0a29ab3f583c1649403319781SeraWomenBlueShrug4.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/17811470/2022/4/8/51b37d45-7220-45cc-8ec1-cf7aa3c911331649403319789SeraWomenBlueShrug5.jpg'
        ],
        title: 'Sera Women Blue & White Printed Longline Tie-Up Shrug',
        price: 597,
        discount: 60,
        size: ['M', 'S', 'L', 'XL'],
        rating: 4.3,
    },
    {
        id: 4,
        images: [
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/productimage/2019/5/13/b6f18498-eac4-46e6-be5c-33160f28ad4f1557732655430-1.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/productimage/2019/5/13/1bd7c60a-6bb2-45d8-8784-5dcdc4fb20641557732655449-2.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/productimage/2019/5/13/17cc2892-4d75-4a2a-814e-b3ef25095bf61557732655471-3.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/productimage/2019/5/13/732c02fd-b3e9-49f5-ba02-517703f17cc41557732655499-4.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/productimage/2019/5/13/8f76fea7-df1f-4041-8cb6-a2aa7b04b3b51557732655529-5.jpg'
        ],
        title: 'Sera Navy Blue & White Printed Tie-Up Shrug',
        price: 517,
        discount: 60,
        size: ['M', 'S', 'L', 'XL'],
        rating: 4.2,
    },
    {
        id: 5,
        images: [
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/18057290/2022/4/27/87353c98-58f7-40ab-84e1-2764066710c91651062716577SeraWomenBlueShrug1.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/18057290/2022/4/27/5e6da5a5-8a74-4e61-96e0-b2cd8e2ac9141651062716560SeraWomenBlueShrug2.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/18057290/2022/4/27/add8e888-f3c8-4b99-8439-bb7b1bfd1e571651062716587SeraWomenBlueShrug3.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/18057290/2022/4/27/7a94d781-b56c-41d4-810c-be97dc73f9b31651062716541SeraWomenBlueShrug4.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/18057290/2022/4/27/2289408f-e1f0-4d74-b21c-2fb6faeea7691651062716551SeraWomenBlueShrug5.jpg'
        ],
        title: 'Sera Women Blue & Pink Printed Crop Shrug',
        price: 519,
        discount: 60,
        size: ['M', 'S', 'L', 'XL'],
        rating: 4.4,
    },
    {
        id: 6,
        images: [
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/17811440/2022/4/8/46dc35c9-171b-49bc-82bd-09cc0e54d25d1649401443825SeraWomenWhiteShrug1.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/17811440/2022/4/8/5de1f791-c3b4-4c87-9482-7a9904928cfe1649401443841SeraWomenWhiteShrug2.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/17811440/2022/4/8/65d47a09-1bad-422c-b103-f0c9632013d31649401443801SeraWomenWhiteShrug3.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/17811440/2022/4/8/3acfed2f-69bc-4a8f-9cbf-4021cdc70dbf1649401443816SeraWomenWhiteShrug4.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/17811440/2022/4/8/eefc259b-2525-4f7b-a78f-c2b1e171a8341649401443833SeraWomenWhiteShrug5.jpg'
        ],
        title: 'Sera Women White & Pink Printed Longline Tie-Up Shrug',
        price: 597,
        discount: 60,
        size: ['M', 'S', 'L', 'XL'],
        rating: 4.2,
    },
    {
        id: 7,
        images: [
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/20386866/2022/10/13/ce67f0ab-d6e3-4544-ba2d-388fa68cb4321665669664756SeraWomenBrownPinkPrintedLonglineTropicalTie-UpShrug1.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/20386866/2022/10/13/fed252e3-7371-4fa8-936e-4cef1cc3c75d1665669664773SeraWomenBrownPinkPrintedLonglineTropicalTie-UpShrug2.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/20386866/2022/10/13/e0f345c7-9c1c-446b-8710-a695cb1d94861665669664765SeraWomenBrownPinkPrintedLonglineTropicalTie-UpShrug3.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/20386866/2022/10/13/64693b40-2e47-416b-b14b-cd1b327f92cd1665669664748SeraWomenBrownPinkPrintedLonglineTropicalTie-UpShrug4.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/20386866/2022/10/13/bbff1fc7-7a03-4a5e-9773-8c3bfceef66f1665669664738SeraWomenBrownPinkPrintedLonglineTropicalTie-UpShrug5.jpg'
        ],
        title: 'Sera Women Brown & Pink Printed Longline Tropical Tie-Up Shrug',
        price: 597,
        discount: 60,
        size: ['M', 'S', 'L', 'XL'],
        rating: 4.3,
    },
    {
        id: 8,
        images: [
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/18360216/2022/5/20/6eb135fc-0239-4dc6-906d-355af2905f5a1653060802922SeraWomenCoralShrug1.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/18360216/2022/5/20/96973ff5-02f3-45d4-a953-f9e63ae82f691653060802939SeraWomenCoralShrug2.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/18360216/2022/5/20/50901cbe-bfd7-4ba6-a203-1a6c749c29461653060802930SeraWomenCoralShrug3.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/18360216/2022/5/20/f1bcb66b-6ca6-4bd3-b742-220b264bda711653060802948SeraWomenCoralShrug4.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/18360216/2022/5/20/e3a5e323-2176-4cde-88fd-2a15d38b74c21653060802912SeraWomenCoralShrug5.jpg'
        ],
        title: 'Sera Women Pink & Green Floral Printed Crop Tie-Up Shrug',
        price: 519,
        discount: 60,
        size: ['M', 'S', 'L', 'XL'],
        rating: 4.4,
    },
    {
        id: 9,
        images: [
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/13997444/2021/4/27/8faed82a-ddfc-4634-95d7-cce9dd8365021619527205837-Sera-Women-Red--White-Printed-Tie-Up-Shrug-241619527205179-1.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/13997444/2021/4/27/eccda97b-c0f2-4e37-a4c9-b4915b3b760a1619527205815-Sera-Women-Red--White-Printed-Tie-Up-Shrug-241619527205179-2.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/13997444/2021/4/27/ed0fcba5-75b7-4cbc-bf8e-857f98ee70f61619527205791-Sera-Women-Red--White-Printed-Tie-Up-Shrug-241619527205179-3.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/13997444/2021/4/27/d8154f00-fa01-4545-ae15-b9604a24f8171619527205768-Sera-Women-Red--White-Printed-Tie-Up-Shrug-241619527205179-4.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/13997444/2021/4/27/3aabe5ec-5135-4bc4-aeab-a52dae3dc84d1619527205746-Sera-Women-Red--White-Printed-Tie-Up-Shrug-241619527205179-5.jpg'
        ],
        title: 'Sera Women Red & White Printed Tie-Up Shrug',
        price: 597,
        discount: 60,
        size: ['M', 'S', 'L', 'XL'],
        rating: 4.2,
    },
    {
        id: 10,
        images: [
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/20445898/2022/10/18/747d786f-98a7-48a4-8142-4fba445c7a051666117268125SeraWomenGreenPrintedLonglineBohemianTie-UpShrug1.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/20445898/2022/10/18/32428228-5ee0-4ce3-a6cd-f93c9494abb91666117268109SeraWomenGreenPrintedLonglineBohemianTie-UpShrug2.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/20445898/2022/10/18/5c9bc15a-794a-41c1-a72c-ff35664004191666117268136SeraWomenGreenPrintedLonglineBohemianTie-UpShrug3.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/20445898/2022/10/18/dd089c51-2a51-420a-a434-0e11ce59eef61666117268098SeraWomenGreenPrintedLonglineBohemianTie-UpShrug4.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/20445898/2022/10/18/05b0ad66-dae1-4eaa-940b-77c23fecfa041666117268117SeraWomenGreenPrintedLonglineBohemianTie-UpShrug5.jpg'
        ],
        title: 'Sera Women Green Printed Longline Bohemian Tie-Up Shrug',
        price: 757,
        discount: 60,
        size: ['M', 'S', 'L', 'XL'],
        rating: 3.2,
    },
    {
        id: 11,
        images: [
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/24510218/2023/8/16/f3cebfef-2c21-4c25-90d8-2318917ec8e81692173774264Shrug1.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/24510218/2023/8/16/f398c02a-a4ba-4f79-bb70-0f51049d8e0f1692173774205Shrug2.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/24510218/2023/8/16/e21c6c2e-4e04-403e-af33-6a42bbcfcc3b1692173774244Shrug3.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/24510218/2023/8/16/9364ce14-3b04-4d53-be7b-acc9d45868f11692173774284Shrug4.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/24510218/2023/8/16/23a01869-674b-4b8c-85fb-6195868eb9591692173774223Shrug5.jpg'
        ],
        title: 'Sera Flutter Sleeves Crop Tie-Up Shrug',
        price: 519,
        discount: 60,
        size: ['M', 'S', 'L', 'XL'],
        rating: 3.2,
    },
    {
        id: 12,
        images: [
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/22200330/2023/3/2/9e76a62a-e357-4842-9786-8d04894e47d01677761687838Shrug1.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/22200330/2023/3/2/bd436b2d-ebef-43ba-b5a6-ffbd55c80a821677761687826Shrug2.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/22200330/2023/3/2/8f2f3291-417f-4941-a420-88f7fcc928711677761687860Shrug3.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/22200330/2023/3/2/5f6b2b0e-7c2f-4f2e-a096-ca64ef0be1651677761687849Shrug4.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/22200330/2023/3/2/6e8ab7af-488a-41af-83ad-7a78f7302f391677761687812Shrug5.jpg'
        ],
        title: 'Sera Floral Printed Asymmetric Open Front Shrug',
        price: 719,
        discount: 60,
        size: ['M', 'S', 'L', 'XL'],
        rating: 4.5,
    },
    {
        id: 13,
        images: [
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/23211794/2023/5/16/545bb76d-87f4-41c0-837e-dca2344457d31684217422688Shrug1.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/23211794/2023/5/16/f60d9af5-da97-462c-a9c8-0ca066d8fc1a1684217422675Shrug2.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/23211794/2023/5/16/d8f7bba0-6e45-4322-a4b0-48059fde33471684217422663Shrug3.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/23211794/2023/5/16/6baa4463-3c73-4798-8cef-30bcabfa43f81684217422641Shrug4.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/23211794/2023/5/16/8f38edf9-b42b-490f-80d3-ea17d13cd8141684217422654Shrug5.jpg'
        ],
        title: 'Sera Orange & Magenta Floral Printed Crop Tie-Up Shrug',
        price: 519,
        discount: 60,
        size: ['M', 'S', 'L', 'XL'],
        rating: 4.1,
    },
    {
        id: 14,
        images: [
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/22242680/2023/3/6/f07e8b83-1aec-4aa5-a9b4-e4802d7841c91678105617634SeraWomenMauveWhitePrintedCropTie-UpShrug1.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/22242680/2023/3/6/0268d163-a398-4e5d-8b35-b9eeb308b5bc1678105617613SeraWomenMauveWhitePrintedCropTie-UpShrug2.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/22242680/2023/3/6/b2891539-9db9-42ec-9f41-3ea15ccffc5b1678105617625SeraWomenMauveWhitePrintedCropTie-UpShrug3.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/22242680/2023/3/6/42156a23-e0bd-41b9-b0e4-6e4cd75bf8511678105617652SeraWomenMauveWhitePrintedCropTie-UpShrug4.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/22242680/2023/3/6/eeb5fe11-9fa3-48a7-895d-0db63fff93a81678105617643SeraWomenMauveWhitePrintedCropTie-UpShrug5.jpg'
        ],
        title: 'Sera Floral Printed Puff Sleeves Crop Tie-Up Shrug',
        price: 519,
        discount: 60,
        size: ['M', 'S', 'L', 'XL'],
        rating: 4.1,
    },
    {
        id: 15,
        images: [
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/25708632/2023/11/1/30e5d4fb-aaa9-473b-ab0c-9dbc8d08690f1698813384130Shrug1.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/25708632/2023/11/1/372ab7c9-25aa-40d3-8eb4-62fe846ee3161698813384138Shrug2.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/25708632/2023/11/1/8c949ed1-e408-4d6a-bd3f-de513c605f751698813384143Shrug3.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/25708632/2023/11/1/de3f5e2e-de6f-4e39-9ab4-9cec0ca323b61698813384149Shrug4.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/25708632/2023/11/1/0548d401-5f3c-4041-986e-97039cf67f6d1698813384155Shrug5.jpg'
        ],
        title: 'Sera Floral Printed Open Front Crop Shrug',
        price: 639,
        discount: 60,
        size: ['M', 'S', 'L', 'XL'],
        rating: 4.1,
    },
    {
        id: 16,
        images: [
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/22185416/2023/3/1/c8065705-6fd4-488e-b52a-b5d529cf88d71677685136826SeraWomenNavyBlueCropTie-UpShrug1.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/22185416/2023/3/1/34ba10ae-2862-461b-9796-a467d32426c41677685136813SeraWomenNavyBlueCropTie-UpShrug2.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/22185416/2023/3/1/4eca147b-758c-48ea-9106-8092a021f6cc1677685136801SeraWomenNavyBlueCropTie-UpShrug3.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/22185416/2023/3/1/60264be2-3c17-4915-8c6b-35efdcee25a91677685136790SeraWomenNavyBlueCropTie-UpShrug4.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/22185416/2023/3/1/ff20c043-30d3-4cd9-a9d4-9f2b0364cba41677685136840SeraWomenNavyBlueCropTie-UpShrug5.jpg'
        ],
        title: 'Sera Women Crop Sheer Tie-Up Shrug',
        price: 519,
        discount: 60,
        size: ['M', 'S', 'L', 'XL'],
        rating: 3.7,
    },
    {
        id: 17,
        images: [
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/24369338/2023/8/7/9cbee2e5-887c-4e17-b1a2-a59e3b81b03c1691379207231Shrug1.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/24369338/2023/8/7/c49bf887-6e4d-45d3-b478-3931ed0eb0941691379207248Shrug2.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/24369338/2023/8/7/01350e6c-71a6-4fad-9069-53038dae28cd1691379207269Shrug3.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/24369338/2023/8/7/0458a37a-33d6-414c-933f-e95cba2ecf141691379207286Shrug4.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/24369338/2023/8/7/5a4075a7-e456-4188-85e2-34ebe26f7fc81691379207303Shrug5.jpg'
        ],
        title: 'Sera Printed Bohemian Crop Shrug',
        price: 759,
        discount: 60,
        size: ['M', 'S', 'L', 'XL'],
        rating: 4.0,
    },
    {
        id: 18,
        images: [
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/22200328/2023/3/2/7d43dbe3-9701-40ba-aab6-16dc57783a2a1677761699857Shrug1.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/22200328/2023/3/2/ea46cdfc-db8d-4d1a-b7bd-2b6b8d58302f1677761699847Shrug2.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/22200328/2023/3/2/a510b75a-c0ed-4e91-af4c-193aaee6b20a1677761699877Shrug3.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/22200328/2023/3/2/bd6a05b3-1f52-4fd2-b16c-087fb7e844a41677761699868Shrug4.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/22200328/2023/3/2/680d0fd9-9414-4ac9-907b-92cb87aa60561677761699835Shrug5.jpg'
        ],
        title: 'Sera Geometric Printed Asymmetric Crop Open Front Shrug',
        price: 719,
        discount: 60,
        size: ['M', 'S', 'L', 'XL'],
        rating: 3.5,
    },
    {
        id: 19,
        images: [
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/22242668/2023/3/6/4942432f-0704-4209-b0c5-76dee7a3c1d01678105613176SeraWomenBlackWhitePrintedCropShrug1.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/22242668/2023/3/6/1cba6b88-15ab-46e4-8903-6c21c2f13c7b1678105613192SeraWomenBlackWhitePrintedCropShrug2.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/22242668/2023/3/6/a1a00d79-0783-4881-9889-bee10a799f491678105613221SeraWomenBlackWhitePrintedCropShrug3.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/22242668/2023/3/6/006acac1-cc34-48b5-ac4d-2094039bafc81678105613206SeraWomenBlackWhitePrintedCropShrug4.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/22242668/2023/3/6/85fde836-a59a-4b4b-b174-c48ee5108e851678105613230SeraWomenBlackWhitePrintedCropShrug5.jpg'
        ],
        title: 'Sera Floral Printed Crop Open Front Shrug',
        price: 639,
        discount: 60,
        size: ['M', 'S', 'L', 'XL'],
        rating: 3.5,
    },
    {
        id: 20,
        images: [
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/24510220/2023/8/16/cfa0bdec-d33f-4868-9fc3-2b1553e6a23c1692173779809Shrug1.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/24510220/2023/8/16/092f7572-d3b3-430e-871d-a1f3cd7ce4341692173779752Shrug2.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/24510220/2023/8/16/fa140dac-7551-4263-a3f5-174879ea98ea1692173779791Shrug3.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/24510220/2023/8/16/ea28d2ff-0fbb-4f05-a876-6680aec57b571692173779773Shrug4.jpg',
            'https://assets.myntassets.com/f_webp,fl_progressive/h_960,q_80,w_720/v1/assets/images/24510220/2023/8/16/5bb04cb1-a0fa-4a6c-9d19-9dad9a2a447c1692173779737Shrug5.jpg'
        ],
        title: 'Sera Floral Printed Crop Tie-Up Shrug',
        price: 519,
        discount: 60,
        size: ['M', 'S', 'L', 'XL'],
        rating: 3.5,
    },
];

export {productsArray, singleData}