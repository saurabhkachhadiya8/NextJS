export default function Footer() {
    return (
        <footer className="w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-6 py-4 text-center text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} My App. All rights reserved.
        </footer>
    )
}
