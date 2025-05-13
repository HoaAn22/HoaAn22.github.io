# Hệ thống giao dịch tự động

[Hệ thống giao dịch thuật toán: Triển khai](assets/posts/project/algorithmic-trading-implementation.md)

## Giới thiệu về giao dịch thuật toán

**Giao dịch thuật toán:** là quá trình sử dụng hệ thống máy tính để tự động giao dịch đặt lệnh mua/bán và báo cáo,... dự trên chiến lược đã được xây dựng.[1]

**Lợi ích của hệ thống giao dịch thuật toán:** **Thứ nhất**, tốc độ đặt lệnh, việc sử dụng hệ thống giao dịch thuật toán nhanh hơn đáng kể khi đặt lệnh thủ công, vừa nhanh và tiện lợi, hơn hết hệ thống luôn giám sát thị trường, giúp đặt lệnh dựa trên những biến động mà con người khó có thể phản ứng kịp. **Thứ hai**, giao dịch thuật toán loại bỏ các yếu tố cảm xúc chỉ dựa trên phân tích và toán học, giúp đảm bảo giao dịch chỉ thực hiện dựa trên logic và khách quan, tránh tâm lý nhà đầu tư hoan mang khi thị trường có biến động. **Thứ ba**, Các công cụ mạnh mẽ trong lập trình sẽ giúp hệ thống tính toán, kiểm tra và triển khai hiệu quả chiến lược.[1]

## Blockchain, Crypto & Tài chính

[Tìm hiểu về Web3](assets/posts/knowledge/web3.md)

Với nhiều ưu điểm, Web3 được kỳ vọng ứng dụng cho nhiều lĩnh vực như game NFT, Bất động sản, Quản lý công, quản lý doanh nghiệp, nghệ thuật,... do  nhu cầu về bảo mật và quyền sử dụng dữ liệu đang trở nên quan trọng trong thời kỳ phát triển hiện nay. Crypto (tiền điện tử) là một ứng dụng tiêu biểu, được chú ý và phát triển mạnh mẽ do tính ứng dụng cao vì sự minh bạch và sau sự kiện khủng hoảng toàn cầu 2008 các nhà đầu tư bắt đầu quan tâm đến 1 hệ thống tài chính phi tập trung thay vì hệ thống tài chính được cang tiệp từ ngân hàng trung ương.

**Công nghệ blockchain** là nền tảng cốt lỗi của tiền điện tử. **Blockchain** như là một sổ tay kỹ thuật được chia sẻ và bất biến, ghi lại tất cả các giao dịch và theo dõi tài sảng trong mạng lưới, không thể chỉnh sử và thay đổi đảm bảo tính minh bạch cho tất cả các giao dịch.[3]

![Blockchain](assets/images/algorithmic-trading/Blockchain.png)
(Nguồn ảnh: https://www.investopedia.com/terms/b/blockchain.asp )

Blockchain hoạt động như một cơ sở dữ liệu phân tán phi tập trung, dữ liệu được ghi trên nhiều máy tính, làm cho nó chống lại khả năng can thiệp.[3] Mỗi giao dịch được nhóm thành các khối, sau đó liên kết với nhau bằng mật mã học [#mã hash] , tạo thành chuỗi an toàn và minh bạch.[4] Cấu trúc của blockchain đảm bảo [#tính toàn vẹn của dữ liệu]  và cung cấp một bản ghi [#không thể giả mạo] , ứng dụng tốt cho crypto hoặc quản lý chuỗi cung ứng. Các giao dịch được xác thực dựa trên [#cơ chế đồng thuận] , đảm bảo sự đồng ý trên toàn mạng lưới.[4] 

**Thành phần chính của công nghệ blockchain gồm:**[5]
- Sổ cái điện tử phân tán
- Hồ sơ bất biến
- Hợp đồng thông minh
- Mật mã khóa công khai

**Tính chất của blockchain:**
- Tính bất biến: đảm bảo rằng không người tham gia nào có thể thay đổi hoặc giả mạo một giao dịch/ thông tin đã được ghi lại.[4]
- Cơ chế đồng thuận: các cơ chế đồng thuận như [#Proof of Work (PoW)]  và [#Proof of Stake (PoS)]  giúp đảm bảo tính minh bạch giao dịch, tất cả các người tham gia đều đồng ý và xác thực hợp lệ giao dịch.

---

**Tiền điện tử - Crypto:** là một phương tiện trao đổi kỹ thuật số được đảm bảo bằng mật mã.[7] Hoạt động trên mạng lưới phi tập trung sử dụng công nghệ Blockchain.[9]

Đặc điểm nổi bật của tiền điện tử là chúng thường không được phát hành hoặc kiểm soát bởi bất kỳ cơ quan trung ương nào, khiến cho chúng về mặc lý thuyết không bị thao túng và can thiệp của chính phủ.[9]

Trên thị trường, tiền điện tử bùng nổ số lượng nhờ sự thành công của Bitcoin. Tiền điện tử đa dạng về loại từ các [#coins] như Bitcoin, Ethereum,.. Các [#tokens] với nhiều mục đích khác nhau hoặc các [#stablecoin] được duy trì giá trị ổn định bằng cách neo giá vào các tài sản như USD có USDT.[7]

Sự đa dạng này đỏi hỏi hệ thống giao dịch thuật toán cần có sự tìm hiểu kỹ và điều chỉnh linh hoạt cho từng loại tiền điện tử.[8]

## Nguyên tắc kinh tế học cho Crypto

Thị trường crypto chịu ảnh hưởng bở các nguyên tắc kinh tế cơ bản bao gồm kinh tế vĩ mô, kinh tế vi mô, kinh tế học hành vi,...

Ở khía cạnh vi mô, giá của crypto được thúc đẩy bởi quy luật cung cầu. Nguồn cung của nhiều crypto bị giới hạn, chẳng hạn như 21 triệu động Bitcoin, tạo ra sự khan hiếm. Khi nhu cầu mua một loại tài sản khan hiếm tăng lên, giá của nó cũng sẽ tăng theo. Nhu cầu ảnh hưởng bởi các yếu tố giá trị cảm nhận, tính hữu dụng, mức độ chấp nhận và tâm lý thị trường.[11]

Về kinh tế vĩ mô, các yếu tố tác động đến crypto gồm: lạm phát, lãi suất, GDP, tỉ lệ thất nghiệp,... ảnh hưởng mạnh đến crypto.[14] [#Lạm phát tăng, nhà đầu tư có thể đầu tư vào crypto như một biện pháp phòng ngừa, vì như đã đề cập thị trường crypto hoạt động dự trên quy luật cung cầu và thị trường phi tập trung minh bạch, tính khách quan cao, nếu crypto có sự ổn định và độ tin cậy nhiều nhà đầu tư có thể tìm đến đây phòng ngừa và tối ưu hóa danh mục]. [#Khi lãi suất tăng, nhu cầu về crypto có thể giảm do tính rủi ro cao, trong khi có thể đầu tư về các tài sản khác vẫn sinh ra lợi nhuận nhờ lãi suất tăng như: trái phiếu, gửi tiết kiệm,...]

Kinh tế học hành vi cũng là một yếu tố quan trọng trọng thị trường biến động mạnh như crypto. Kinh tế học hành vi cung cấp những hiểu biết sâu sắc về quá trình ra quyết định. Các khái niệm FOMO (sợ bỏ lỡ), FUD (sợ hãi, bất ổn, nghi ngờ) và 
hiệu ứng bầy đàn có thể gây ra những biến động giá đáng kể không liên quan đến cách yếu tố cơ bản.[33] *Tìm hiểu thêm*

## Phân tích cơ bản, kỹ thuật và phân tích cảm xúc thị trường crypto

**Phân tích kỹ thuật, công cụ và chỉ báo phân tích**

phân tích kỹ thuật là khía cạnh quan trọng của giao dịch thuật toán crypto. Nó liên quan đến việc phân tích dữ liệu giá và khối lượng lịch sử để xác định xu hướng và dự báo giá trong tương lai.[36]

Các chỉ báo kỹ thuật được các nhà giao dịch sử dụng nổi bật, đường trung bình động (Moving Averages) làm mượt dữ liệu giá trong một khoảng thời gian nhất định để xác định xu hướng thị trường.[37] Chỉ số sức mạnh tương đối như (RSI) là chỉ báo động lượng đo tốc độ và sự thay đổi của biến động giá xác định điểm quá mua và quá bán.[37] Đường trung động hội tụ phân kỳ (MACD) là chỉ báo chỉ báo theo xu hướng sử dụng sử dụng sự khác biệt giữa 2 đường trung bình động để xác định cơ hội mua bán.[37] Dãi Bollinger đo lường sự biến động của thị trường bằng cách phân tích phạm vị giá của 1 tài sản trong một khoảng thời gian, xem giá trị của tài sản đó có còn đáng để đầu tư hoặc xem rủi ro giá của nó. Kết hợp và ứng dụng thành thạo các chỉ báo này giúp tạo ra chiến lược tối ưu và hiệu quả dự trên chỉ báo, toán học và logic.[37]

---

**Phân tích cơ bản**

Phân tích cơ bản là quá trình đánh giá giá trị nội tại của tài sản bằng cách xem xét yêu tố kinh tế, tài chính, sự kiện, công nghệ ảnh hưởng đến giá trị của nó.[45]

Đối với thị trường điện tử, phân tích cơ bản là quá trình đọc hiểu và phân tích whitepaper của một dự án, đội ngũ phát triển, công nghệ cơ bản, trường hợp sử dụng và tokenomics (kinh tế mã thông báo), phân tích cơ bản giúp phát hiện tiềm năng của đồng tiền, ứng dụng và tương lai phát triển của chúng.[45] Tin tức và các sự kiện (Phân tích tâm lý thị trường)  cũng đóng vai trò quạn trọng trong phân tích cơ bản, ví dụ như các tin tức tích cực khiến cho giá crypto tăng và ngược lại,[45] nắm vững tâm lý thị trường vừa giúp hiểu rõ hơn về tâm lý, vừa bình tĩnh đối mặt với biến động thị trường và dự đoán được diễn biến tiếp theo của thị trường từ đó đưa ra quyết định mang lại lợi nhuận cao và giảm thiểu rủi ro. Mặc dù phân tích cơ bản thường phổ biến với các tài sản đầu tư khác như chứng khoán vì dùng nó để xác định giá trị nội tại và đầu tư dài hạn vào sản phẩm tiềm năng, nhưng với thị trường crypto cũng cần nắm chắc phân tích này để hiểu rõ giá trị nội tại của đồng coin đang đầu tư, tăng cường niềm tin, độ ổn định và giá trị đầu tư lâu dài.

## Tìm hiểu về các chiến lược giao dịch

**Chiến lược giao dịch**

Các chiến lược giao dịch được biết đến rộng rãi là:
- Giao dịch trong ngày (Day Trading): liên quan đến việc thực hiện nhiều giao dịch trong 1 ngày, tận dụng các biến động giá của thị trường.[36]
- Giao dịch theo xu hướng (Swing Trading) là thực hiện giao dịch dựa trên biến động 

**Xây dựng chiến lược giao dịch cá nhân**

Đề thiết kế một thuật toán tốt, đòi hỏi phải xác định rõ các logic giao dịch, bao gồm các nguyên tắc vào và ra lệnh, các điều kiện và chỉ báo kỹ thuật sử dụng

## Tìm hiểu công nghệ triển khai

Một số thư viện python cho hệ thống giao dịch tự động Pandas, Numpy, Scipy,... Các thư viện cho phép tiền xử lý và tính toán dữ liệu giá, xây dựng các chiến lược giao dịch, thư viện TA-Lib hỗ trợ phân tích kỹ thuật, được xây dựng sẵn với hơn 150 chỉ báo giúp dễ dàng phân tích và xây dựng chiến lược. Thư viện ccxt (CryptoCurrency eXchange Trading Library) là thư viện lấy dữ liệu về crypto quan trọng nên biết, thư viện chó phép kết nối đến các sẵn giao dịch crypto nổi tiếng.[48]

Xây dựng 1 hệ thống giao dịch cần thu thực hiện các bước thu thập dữ liệu giá bằng crawl dữ liệu từ các sàn hoặc sử dụng thư viện hỗ trợ. Tiền xử lý, trực quan và phân tích dữ liệu xác định xu hướng bằng các chỉ báo kỹ thuật, nghiên cứu dự án đồng coin chuẩn bị xây dựng thuật toán và xây dựng thuật toán. Bước quan trọng nhất, sau khi xây dựng xong thuật toán giao dịch là kiểm thử, dùng thư viện backtesing kiểm tra độ hiệu quả chiến lược.

Bước cuối cùng là tìm hiểu về API và kết nối hệ thống đến các sàn giao dịch, đối với chứng khoán các sàn giao dịch lớn thường cung cấp sẵn API để khách hàng có nhu cầu sử dụng, bạn có thể tìm hiểu tại trang chủ. Đối với tị trường crypto, thư viện ccxt giúp công việc này trở nên đơn giản hơn, bởi ngoài việc lấy dữ liệu giá, thư viện cung cấp kết nối đến rất nhiều sàn lớn như Binance, Bybit,...

## Phát triển và Triển khai Chiến lược Giao dịch 

**Các chiến lược giao dịch:**
- Giao dịch theo ngày (Day Trading) là giao dịch nhiều lệnh trong 1 ngày tận dùng biến động giá để thu lợi nhuận.
- Giao dịch theo xu hướng (Swing Trading) là nắm bắt các xu hướng dài hạn vài ngày đến vài tuần để đặt lệnh hợp lý tối ưu phí giao dịch.
- Holding là chiến lược đầu tư dài hạn, cần nhắm vững giá trị nội tại và xu hướng phát triển của đồng coin đầu tư, đầu tư các đồng coin có tính ổn định và xu hướng tốt. Bỏ qua các biến động ngắn hạn.
- Lướt sóng (Scalping) là một chiến lược tốc độ nhanh tập trung vào  kiếm lợi nhuận từ các biến động giá nhỏ trong khoảng thời gian ngắn.[37]
- Kinh doanh chênh lệch giá (Arbitrage) là khai thác khác biệt về giá của cùng 1 loại tài sản trên các sàn giao dịch khác nhau.[36]
- Đảo chiều trung bình (Mean Reversion) dự trên giả định rằng tài sản cuối cùng sẽ quay lại mức trung bình trong lịch sử của chúng.[45] Mức trung bình lịch sử là gía trung bình, lợi suất trung bình hoặc một mức cân bằng được tính bằng phương pháp thống kê, trung bình cộng hoặc trung bình động (moving average),.. Cơ chế của nó là khi tài sản được định giá vực mức trung bình (cao) giá của tài sản sẽ có xu hướng giảm xuống và **NGƯỢC LẠI**. Tuy nhiên, một số loại tài sản có mức tăng trưởng mạnh có thể không tuân theo giả thuyết.

**Thiết kế và lựa cho chiến lược giao dịch cá nhân**

Thiết kế chiến lược giao dịch thuật toán cá nhân cần xác định được các yếu tố:
- Kì vọng lợi nhuận và rủi ro chấp nhận được.
- Thiết kế thuật toán với logic rõ ràng, như quy tắc vào/ra lệnh các chỉ báo kỹ thuật sử dụng. Kiểm tra kỹ chiến lược mẫu trước khi triển khai thực tế.
- Lựa cho giao dịch các đồng coins phù hợp, tính thanh khoản cao, ổn định, cân bằng tốt giữa lợi nhuận và rủi ro, đặc biệt trong thị trường biến động mạnh như crypto.
- Tính toán và kiểm tra, các chi phí liên quan như phí giao dịch và trượt giá cũng nên được xem xét, vì chúng có thể ảnh hưởng đến lợi nhuận của chiến lược, đặc biệt đối với các chiến lược giao dịch tần suất cao.[55]
- Giới hạn về phần cứng và thuật toán, đối với giao dịch thuật toán cá nhân việc giao dịch tần suất cao liên tục có thể khó khăn do vấn đề về phần cứng. Có thể cài đặt thuật toán với tần xuất đặt lệnh phù hợp tối ưu chi phí giao dịch và giảm tải áp lược về phần cứng.

---

**Bảng so sách chiến lược giao dịch**

## Triển khai hệ thống

## Rủi ro hệ thống

## Giải thích thuật ngữ

## File & Tài liệu tham khảo

- [file báo cáo (pdf)](assets/files/pdf/algorithmic-trading.pdf)