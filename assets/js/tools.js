
// Sample tools data - this can be expanded to include 500+ tools as mentioned in the requirements
const toolsData = [
    {
        tool_name: "Metasploit",
        category: "Exploitation",
        description: {
            en: "Penetration testing framework for exploiting vulnerabilities",
            ar: "إطار عمل لاختبار الاختراق واستغلال الثغرات"
        },
        danger_level: "🔥🔥🔥🔥",
        usage_example: "msfconsole -q",
        video_tutorial: "https://youtu.be/EXAMPLE",
        official_docs: "https://metasploit.com/docs"
    },
    {
        tool_name: "Nmap",
        category: "Network Analysis",
        description: {
            en: "Network exploration tool and security scanner",
            ar: "أداة استكشاف الشبكة وماسح أمني"
        },
        danger_level: "🔥🔥",
        usage_example: "nmap -sS 192.168.1.1",
        video_tutorial: "https://youtu.be/EXAMPLE",
        official_docs: "https://nmap.org/docs"
    },
    {
        tool_name: "Wireshark",
        category: "Network Analysis",
        description: {
            en: "Network protocol analyzer for packet inspection",
            ar: "محلل بروتوكول الشبكة لفحص الحزم"
        },
        danger_level: "🔥",
        usage_example: "wireshark -i eth0",
        video_tutorial: "https://youtu.be/EXAMPLE",
        official_docs: "https://wireshark.org/docs"
    },
    {
        tool_name: "John the Ripper",
        category: "Password Cracking",
        description: {
            en: "Password security auditing and recovery tool",
            ar: "أداة تدقيق واستعادة كلمات المرور"
        },
        danger_level: "🔥🔥🔥",
        usage_example: "john --wordlist=passwords.txt hashes.txt",
        video_tutorial: "https://youtu.be/EXAMPLE",
        official_docs: "https://www.openwall.com/john/doc/"
    },
    {
        tool_name: "Aircrack-ng",
        category: "Wireless Attacks",
        description: {
            en: "WiFi network security assessment tools suite",
            ar: "مجموعة أدوات تقييم أمان شبكة WiFi"
        },
        danger_level: "🔥🔥🔥",
        usage_example: "aircrack-ng -b 00:11:22:33:44:55 -w wordlist.txt capture.cap",
        video_tutorial: "https://youtu.be/EXAMPLE",
        official_docs: "https://www.aircrack-ng.org/documentation.html"
    },
    {
        tool_name: "Autopsy",
        category: "Forensic Analysis",
        description: {
            en: "Digital forensics platform for disk analysis",
            ar: "منصة التحليل الجنائي الرقمي لتحليل الأقراص"
        },
        danger_level: "🔥",
        usage_example: "autopsy",
        video_tutorial: "https://youtu.be/EXAMPLE",
        official_docs: "https://www.autopsy.com/documentation/"
    }
];

// Function to check if a tool is dangerous (3 or more fire emojis)
function isDangerousTool(dangerLevel) {
    return dangerLevel.length >= 3;
}

// Get tools by category
function getToolsByCategory(category) {
    if (category === 'all') return toolsData;
    return toolsData.filter(tool => tool.category.toLowerCase() === category.toLowerCase());
}
